import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatchResponse } from 'src/app/models/Matches';
import { Player } from 'src/app/models/Players';
import { MatchService } from 'src/app/services/matches.service';
import { PlayerService } from 'src/app/services/players.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public matches: MatchResponse[] = [];
  public matchesFiltrados: MatchResponse[] = [];
  public players: Player[] = [];
  public modalRef!: BsModalRef;

  logoWidth: number = 120;
  showInfo: boolean = false;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  //Dentro do ngOnInit, podemos colocar métodos que serão inicializados antes de valores serem atribuidos ao nosso HTML
  public ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
    }, 3500);
    this.getMatches();
    this.getPlayers();
  }

  public getMatches() {
    this.matchService.getAllMatches().subscribe({
      next: (matches: MatchResponse[]) => {
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
      }
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

}
