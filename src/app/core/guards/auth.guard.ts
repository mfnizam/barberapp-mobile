import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._check();
  }

  private _check(): Observable<boolean> {
    return this.auth.authCheck()
      .pipe(
        switchMap(authenticated => {
          if (!authenticated) {
            this.auth.signOut();
            this.router.navigate(['auth']);
            return of(false);
          }
          return of(true);
        }),
      );
  }

}
