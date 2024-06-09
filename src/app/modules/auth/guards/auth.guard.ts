
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// // import { Role } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class authGuard implements CanActivate  {
//   constructor(private router: Router, private _AuthService: AuthService) { }

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
//     : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // debugger
//     let token = localStorage.getItem('access_token');
//     // let token ;
//     // let role: Role;
//     // localStorage.setItem(token, 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExNDU5MzgxLCJpYXQiOjE3MTEyODY1ODEsImp0aSI6ImMwYWJlZGM1YTk3MTQ3MjhhN2MxYmQ3MGExOWFmMGU0IiwidXNlcl9pZCI6Mjg4OH0.xY_XtHbZ7jG0ijOp3eWyB1rwTi3DunnsEGzquUyVW44')
//     // if (token && state.url != '/login') {
//     //   return true;
//     // }
//     // else if (token && state.url == '/login') {
//     //   this.router.navigate(['dashboard']);
//     //   return false;
//     // }
//     // else if (!token && state.url != '/login') {
//     //   this.router.navigate(['login']);
//     //   return true;
//     // }

//     // if(this._AuthService.adminLogin) {
//     //   role = Role.Admin || Role.Provider;
//     //   return true;
//     // }
//     // else if(this._AuthService.login) {
//     //   role = Role.User;
//     //   return true;
//     // }
//     if (!token) {
//       this.router.navigate(['/login']);
//       return true;
//     }
//     this.router.navigate(['/not-authorized']);
//     return false;
//   }
// }


// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(private _router: Router, private _AuthService: AuthService) {}

//   // canActivate
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const currentUser = this._AuthService.currentUserValue;

//     if (currentUser) {
//       // check if route is restricted by role
//       if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
//         // role not authorised so redirect to not-authorized page
//         this._router.navigate(['/not-authorized']);
//         return false;
//       }

//       // authorised so return true
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }



import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let provider_name = localStorage.getItem('provider_name');
    let user_name = localStorage.getItem('user_name');
    if (user_name === '' && state.url !== '/order/provider-orders'){
      this.router.navigate(['/not-authorized']);
      return false;
    } else if (user_name === '' && state.url !== '/order/order-history'){
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
