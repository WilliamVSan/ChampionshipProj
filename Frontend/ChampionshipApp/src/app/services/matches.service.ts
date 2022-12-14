import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/matches';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    url = "https://localhost:5001/api/Matches/"

    constructor(private http: HttpClient){}

    getAllMatches(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}`);
    }

    getMatchesById(id: string): Observable<Match> {
        const apiurl = `${this.url}/${id}`;
        return this.http.get<Match>(apiurl);
    }

    createMatch(match: Match): Observable<Match> {
        return this.http.post<Match>(this.url, match, httpOptions);
    }

    updateMatch(matchId: string,match: Match): Observable<Match> {
        const apiurl = '${this.url}/${matchId}';
        return this.http.put<Match>(apiurl, match, httpOptions);
    }

    deleteMatchById(matchId: string): Observable<number> {
        const apiurl = '${this.url}/${matchId}';
        return this.http.delete<number>(apiurl, httpOptions);
    }

}
