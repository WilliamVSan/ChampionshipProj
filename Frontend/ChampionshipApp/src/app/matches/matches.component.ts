import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Match } from '../models/matches';
import { MatchService } from '../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  public matches!: Array<any>;
  public match!: Match;


  constructor(private matchService: MatchService){}

  //Dentro do ngOnInit, podemos colocar métodos que serão inicializados antes de valores serem atribuidos ao nosso HTML
  ngOnInit(): void {
    this.show();

  }

  // }
  show(){
    this.matchService.getAllMatches().subscribe(matches => this.matches = matches);
  }

}



