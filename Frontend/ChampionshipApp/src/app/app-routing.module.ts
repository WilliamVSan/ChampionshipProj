import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchesListComponent } from './components/matches/matches-list/matches-list.component';
import { MatchesDetailsComponent } from './components/matches/matches-details/matches-details.component';
import { PlayersComponent } from './components/players/players.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'matches', redirectTo: 'matches/list', pathMatch: 'full'},
  { path: 'matches', component: MatchesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'list', component: MatchesListComponent},
      {path: 'detail', component: MatchesDetailsComponent},
      {path: 'detail/:id', component: MatchesDetailsComponent},
    ]
  },
  { path: 'players', component: PlayersComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
