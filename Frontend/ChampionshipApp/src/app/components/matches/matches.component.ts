import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Match } from '../../models/Matches';
import { Player } from '../../models/Players';
import { MatchService } from '../../services/matches.service';
import { PlayerService } from '../../services/players.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public matches: Match[] = [];
  public matchesFiltrados: Match[] = [];
  public players: Player[] = [];
  public modalRef!: BsModalRef;

  logoWidth: number = 120;
  showInfo: boolean = false;
  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.matchesFiltrados = this.filtroLista
      ? this.filtrarMatches(this.filtroLista)
      : this.matches;
  }

  filtrarMatches(filtrarPor: string): Match[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.matches.filter(
      (match: { GameName: string; WinnerName: string }) =>
        match.GameName.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        match.WinnerName.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  //Dentro do ngOnInit, podemos colocar métodos que serão inicializados antes de valores serem atribuidos ao nosso HTML
  public ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
    }, 3500);
    this.getMatches();
    this.getPlayers();
    /** spinner starts on init */
  }

  public getMatches() {
    this.matchService.getAllMatches().subscribe({
      next: (matches: Match[]) => {
        this.matches = matches;
        this.matchesFiltrados = this.matches;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Erro ao carregar as partidas.', 'Error');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
  public getPlayers() {
    this.playerService.getAllPlayers().subscribe({
      next: (players: Player[]) => {
        this.players = players;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Erro ao carregar as partidas.', 'Error');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.showInfo = !this.showInfo;
  }
}
