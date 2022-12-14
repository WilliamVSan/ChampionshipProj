import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchService } from './services/matches.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//É o que possibilita utilizarmos dentro de nosso componente a referência do HTTP Client.
    BrowserAnimationsModule,

  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
