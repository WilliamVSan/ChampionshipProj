import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Player } from '../models/Players';

@Injectable()
export class PlayerService {
  url: string = 'https://localhost:5001/api/Players';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentPlayer = {};

  constructor(
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  login(player: Player) {
    const apiurl = `${this.url}/authenticate`;

    this.spinner.show();
    setTimeout(() => {}, 2500);

    return this.http.post<any>(apiurl, player)
      .subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.getPlayerById(response.player.Id).subscribe(res => {
          this.currentPlayer = res;
          console.log(this.currentPlayer);
          this.router.navigate([`/user/profile/${res.Id}`]);
          this.toastr.success('Usuário logado com sucesso.', 'Success');
        });
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Email ou senha incorretos.', 'Error');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  signUp(player: Player): Observable<Player> {
    const apiurl = `${this.url}/register`;
    return this.http
      .post<Player>(apiurl, player)
      .pipe(catchError(this.handleError));
  }

  updatePlayer(updatedPlayer: Player): Observable<any>{
    const apiurl = `${this.url}/update/${updatedPlayer._id}`;
    return this.http
    .put(apiurl, updatedPlayer, { headers: this.headers })
    .pipe(catchError(this.handleError));
  }


  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['/user/login']);
    }
  }

  getAllPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

  getPlayerById(id: any): Observable<any> {
    const apiurl = `${this.url}/${id}`;
    return this.http.get(apiurl, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getPlayerNameById(id: string, winnerId: string): Observable<Player> {
    const apiurl = `${this.url}/${id}`;
    var player = this.http.get<Player>(apiurl);
    if (id === winnerId) {
      return player;
    }
    return player;
  }

  getPlayerIdByEmail(email: string): Observable<string> {
    const apiurl = `${this.url}/${email}`;
    var id = this.http.get<string>(apiurl);
    if (id == null) return null;
    return id;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
