import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLoggedIn(state.url);
    //return true;
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }


  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
