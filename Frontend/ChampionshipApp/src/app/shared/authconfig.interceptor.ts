import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { PlayerService } from '../services/players.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private playerService: PlayerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.playerService.getToken();
    req = req.clone({
      setHeaders: {
        Autorization: 'Bearer ' + authToken,
      }
    });
    return next.handle(req);
  }
}
