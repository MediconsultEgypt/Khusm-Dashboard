import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBrokerData } from './create-broker.model';


@Injectable()
export class CreateBrokerUsersService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }

  // create broker users
  createBrokerUsers(userData: CreateBrokerData): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.api_url}create_broker_users/`, userData).subscribe(
        (response: any) => {
          resolve(response);
        //   this._toastrService.success(response.message);
        },
        (error: any) => {
          reject(error);
        //   this._toastrService.error(error);
        }
      );
    });
  }
}
