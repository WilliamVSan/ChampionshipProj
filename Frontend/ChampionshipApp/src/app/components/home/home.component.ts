import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Player } from 'src/app/models/Players';
import { PlayerService } from 'src/app/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
