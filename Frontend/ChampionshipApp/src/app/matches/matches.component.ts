import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Match } from '../models/matches';
import { Player } from '../models/players';
import { MatchService } from '../services/matches.service';
import { PlayerService } from '../services/players.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public matches: any = [];
  public matchesFiltrados: any = [];
  public players: any = [];

  logoWidth: number = 70;
  showInfo: boolean = false;
  private _filtroLista: string = "";

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.matchesFiltrados = this.filtroLista ? this.filtrarMatches(this.filtroLista) : this.matches;
  }

  filtrarMatches(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.matches.filter((match: { GameName: string; WinnerName: string}) =>
      match.GameName.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      match.WinnerName.toLocaleLowerCase().indexOf(filtrarPor) !== -1

      );

  }

  constructor(private matchService: MatchService, private playerService: PlayerService){}

  //Dentro do ngOnInit, podemos colocar métodos que serão inicializados antes de valores serem atribuidos ao nosso HTML
  ngOnInit(): void {
    this.getMatches();
    this.getPlayers();
  }

  getMatches(){
    this.matchService.getAllMatches().subscribe(matches =>
       this.matches = matches,
       error => console.log(error));
  }
  getPlayers(){
    this.playerService.getAllPlayers().subscribe(players => {
      this.players = players;
      this.matchesFiltrados = this.matches;
      },
      error => console.log(error));
  }

  showInformations(){
    this.showInfo = !this.showInfo;
  }

}




