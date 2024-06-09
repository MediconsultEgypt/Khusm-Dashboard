import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProviderProductService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }




  // get all provider product
  getAll(page: number): Observable<any> {
   
    const params = new HttpParams().set('page', String(page));
    return this._httpClient.get<any[]>(`${environment.api_url}provider_product_admin/`, { params });
  }

  // get provider product (by id)
  getByID(id: number): Promise<any[]> {
   
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.api_url}provider_product_admin/${id}`).subscribe((response: any) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
      )
    })
  }
}

