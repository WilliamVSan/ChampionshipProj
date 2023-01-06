import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Player } from '../../models/Players';
import { PlayerService } from '../../services/players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public players: Player[] = [];

  ngOnInit(): void {
    this.getPlayers();
  }

  public getPlayers() {
    this.playerService.getAllPlayers().subscribe({
      next: (players: Player[]) => {
        this.players = players;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Erro ao carregar os jogadores.');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  public orderPlayers(players: Player[]){
    return players.sort((a, b) => (a.TotalPoints > b.TotalPoints ? -1 : 1));
  }

}
