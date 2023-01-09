import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, MatchResponse } from '../models/Matches';
import { environment } from 'src/environments/environment';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable()
export class MatchService {

    constructor(private http: HttpClient){}

    getAllMatches(): Observable<MatchResponse[]> {
        return this.http.get<MatchResponse[]>(`${environment.api}/matches`);
    }

    getMatchesById(id: string): Observable<Match> {
        const apiurl = `${environment.api}/matches/${id}`;
        return this.http.get<Match>(apiurl);
    }

    getMatchesByName(name: string): Observable<Match> {
        const apiurl = `${environment.api}/matches/${name}`;
        return this.http.get<Match>(apiurl);
    }

    createMatch(match: Match): Observable<Match> {
        return this.http.post<Match>(`${environment.api}/matches`, match, httpOptions);
    }

    updateMatch(matchId: string,match: Match): Observable<Match> {
        const apiurl = `${environment.api}/${matchId}`;
        return this.http.put<Match>(apiurl, match, httpOptions);
    }

    deleteMatchById(matchId: string): Observable<number> {
        const apiurl = `${environment.api}/${matchId}`;
        return this.http.delete<number>(apiurl, httpOptions);
    }

}
