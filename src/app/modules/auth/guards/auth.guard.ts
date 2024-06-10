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
