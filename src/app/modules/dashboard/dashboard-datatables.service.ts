import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class DashboardDatatablesService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }

  // get total provider ratings
  get_total_prov_ratings(): Observable<any> {
    return this._httpClient.get<any[]>(`${environment.api_url}total_ratings`);
  }
 
  // get total visits
  get_total_visits(): Observable<any> {
    return this._httpClient.get<any[]>(`${environment.api_url}total_visits`);
  } 

  // get total provider orders
  get_total_prov_orders(): Observable<any> {
    return this._httpClient.get<any[]>(`${environment.api_url}total_provider_orders`);
  }
  
  // get total provider orders
  get_prov_branch_orders(): Observable<any> {
    return this._httpClient.get<any[]>(`${environment.api_url}total_branches_orders`);
  }
}

