import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DashboardService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }




  // get app stats
  get_appStats(): Observable<any> {
    return this._httpClient.get<any[]>(`${environment.api_url}app_stats/`);
  }

  // total packages
  // is active --> true
  get_PremiumPackages(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_packages?is_active=true`);
  }

  // is active --> false
  get_RegularPackages(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_packages?is_active=false`);
  }

  // total
  get_TotalPackages(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_packages`);
  }
  

  // get total orders 
  get_total_orders(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_orders`);
  }

  // get total users 
  get_total_users(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_users`);
  }

  // get total providers 
  get_total_providers(provider_category?: any): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_providers?provider_category=${provider_category}`);
  }

  // get total provider branches 
  get_total_prov_branches(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_provider_branches?`);
  }

  // get total visits
  get_total_visits(): Observable<any> {
   
    return this._httpClient.get<any[]>(`${environment.api_url}total_visits`);
  }
 
}

