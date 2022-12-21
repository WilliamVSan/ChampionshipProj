import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchService } from './services/matches.service';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MatchesComponent,
    NavComponent,
      SidebarComponent,
      HeaderComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//É o que possibilita utilizarmos dentro de nosso componente a referência do HTTP Client.
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule
  ],
  providers: [MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
