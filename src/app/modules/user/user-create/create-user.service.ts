import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ICreateClientData } from '../users.model';


@Injectable()
export class CreateBulkUsersService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }

  // create users
  createBulkUser(userData: any): Promise<any> {
   
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.api_url}create_bulk_users/`, userData).subscribe(
        (response: any) => {
          resolve(response.data);
        //   this._toastrService.success(response.message);
        },
        (error: any) => {
          reject(error);
        //   this._toastrService.error(error);
        }
      );
    });
  }

  // create provider users
  createProviderUsers(userData: any): Promise<any> {
   
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.api_url}create_bulk_prov/`, userData).subscribe(
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

  // create broker users
  createBrokerUsers(userData: any): Promise<any> {
   
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.api_url}create_broker_users/`, userData).subscribe(
        (response: any) => {
          resolve(response.data);
        //   this._toastrService.success(response.message);
        },
        (error: any) => {
          reject(error);
        //   this._toastrService.error(error);
        }
      );
    });
  }


  // get provider categories list
  get_prov_cat_list(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.api_url}categories/`).subscribe((response: any) => {
        resolve(response.data);
        // this._toastrService.success(response.message);
      },
      (error) => {
        reject(error);
        // this._toastrService.error(error);
      }
      )
    })
  }

  // create client user
  createClientUser(body: any): Promise<any> {
   
    return new Promise((resolve, reject) => {
      this._httpClient.post(`https://backend-mediconsultapp.bit68.com/en/api/client_user_bulk`, body).subscribe(
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
