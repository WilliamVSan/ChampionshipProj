import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchResponse } from 'src/app/models/Matches';
import { Player, PlayerResponse } from 'src/app/models/Players';
import { MatchService } from 'src/app/services/matches.service';
import { PlayerService } from 'src/app/services/players.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-matches-details',
  templateUrl: './matches-details.component.html',
  styleUrls: ['./matches-details.component.scss'],
})
export class MatchesDetailsComponent implements OnInit {
  public matches: MatchResponse[] = [];
  public matchesFiltrados: MatchResponse[] = [];
  public players: PlayerResponse[] = [];
  public player!: PlayerResponse;
  public modalRef!: BsModalRef;

  public form!: FormGroup;

  logoWidth: number = 120;
  showInfo: boolean = false;
  editing: boolean = false;

  selectedGame: any;
  gameList: any[] = [
    {Name: 'tarkov', Logo: 'tarkov.png', Cover: 'tarkov.jpg'},
    {Name: 'gartic', Logo: 'gartic.png', Cover: 'gartic.png'},
    {Name: 'rocket', Logo: 'rocket.png', Cover: 'rocket.jpg'}
  ];

  private _filtroLista: string = '';

  get f(): any{
    return this.form.controls;
  }

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.matchesFiltrados = this.filtroLista
      ? this.filtrarMatches(this.filtroLista)
      : this.matches;
  }

  filtrarMatches(filtrarPor: string): MatchResponse[] {
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
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  //Dentro do ngOnInit, podemos colocar métodos que serão inicializados antes de valores serem atribuidos ao nosso HTML
  public ngOnInit(): void {
    this.validation();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
    }, 3500);
    this.getMatches();
    this.getPlayers();
    this.getPlayer();
    /** spinner starts on init */
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
  public getPlayer() {
    this.playerService.getPlayerById('6390d1a69dfa4236e085942f').subscribe({
      next: (player: Player) => {
        this.player = player;
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

  public editingMatch(): void {
    this.editing = !this.editing;
    this.form.reset();
  }

  detalheMatch(id: string): void {
    this.router.navigate([`matches/detail/${id}`]);
  }

  public validation(): void {
    this.form = this.fb.group({
      GameName: ['', Validators.required],
      Description: [
        '',[
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(50),
      ]],
      PlayerList: [''],
      WinnerName: [''],
      MatchDate: ['', Validators.required],
      LogoURL: [''],
      Cover: [''],
    });
  }

  onSelected(): void {
    this.selectedGame = this.form.get("GameName").value;
    for(let game of this.gameList){
      if(this.selectedGame == game.Name){
        this.form.patchValue({
          LogoURL: game.Logo,
          Cover: game.Cover
        })
      }
    }
  }

  public console(){
    console.log(this.selectedGame);
    console.log(this.form);
  }

}
