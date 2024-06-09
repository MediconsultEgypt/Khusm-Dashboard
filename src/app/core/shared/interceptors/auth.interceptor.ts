import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (localStorage.getItem('access_token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${localStorage.getItem('access_token')}`,
        },
      });
    }
  

    return next.handle(request).pipe(catchError(error => {
      console.error('Request error:', error); // Log errors
      if (error.status === 401 && error.statusText === 'Unauthorized') {
        localStorage.clear();
        // window.location.reload();
        this.router.navigate(['/not-authorized']);
      } else {
        return throwError(() => error);
      }
    }));
  }

}
