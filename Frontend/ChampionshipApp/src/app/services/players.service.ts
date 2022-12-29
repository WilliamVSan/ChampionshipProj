import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Player } from "../models/Players";

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable()
export class PlayerService {

  url = "https://localhost:5001/api/Players"

  constructor(private http: HttpClient){}

  getAllPlayers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }

  getPlayerById(id: string): Observable<Player> {
    const apiurl = `${this.url}/${id}`;
    return this.http.get<Player>(apiurl);

  }
  getPlayerNameById(id: string, winnerId: string): Observable<Player> {
    const apiurl = `${this.url}/${id}`;
    var player = this.http.get<Player>(apiurl);
    if (id === winnerId) {
      return player;
    }
    return player;
  }

}
