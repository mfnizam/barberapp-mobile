import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { AuthUtils } from '@core/utils/auth.utils';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toast: ToastController,
    private navCtrl: NavController,
    private router: Router
    ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getAccessToken())
    .pipe(switchMap(accessToken => {
      let newReq = req.clone();
      if(accessToken && !AuthUtils.isTokenExpired(accessToken)) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', 'bearer ' + accessToken)
        });
      }

      return next.handle(newReq)
      .pipe(
        catchError((response) => {
          let urlchek = ['signin', 'signup'].some(term => this.router.url.includes(term))
          if(response instanceof HttpErrorResponse && response.status === 401 && !urlchek) {
            let auth = this.auth.authenticated
            this.auth.signOut();
            this.navCtrl.navigateRoot(['/auth'], { animationDirection: 'forward' }).then(async res => {
              if(auth) {
                let toast = await this.toast.create({
                  message: 'Sesi anda telah habis',
                  duration: 3000,
                  buttons: [{ icon: 'close' }],
                  mode: 'ios',
                  color: 'medium'
                });
                toast.present();
              }
            })
          }
          return throwError(response);
        })
        );
    }))
    
  }
}
