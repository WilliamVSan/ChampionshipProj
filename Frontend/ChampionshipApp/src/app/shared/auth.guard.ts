import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PlayerService } from '../services/players.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public playerService: PlayerService,
    public router: Router,
    public toastr: ToastrService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.playerService.isLoggedIn !== true) {
      this.router.navigate(['/user/login'])
      this.toastr.error('Acesso negado.', 'Error');
    }
    return true;
  }
}
