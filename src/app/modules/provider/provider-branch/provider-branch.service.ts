import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProviderBranchService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
  //   let currentId = Number(route.paramMap.get('id'));
  //   return new Promise<void>((resolve, reject) => {
  //     Promise.all([this.viewVehicleMake(currentId)]).then(() => {
  //       resolve();
  //     }, reject);
  //   });


  // get provider branches
  get_provider_branchs(page: number): Observable<any> {
    const params = new HttpParams().set('page', String(page));
    return this._httpClient.get<any[]>(`${environment.api_url}providers-branch/`, { params });
  }

  // get one provider branch (by id)
  getByID(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.api_url}providers-branch/${id}`).subscribe((response: any) => {
        // console.log(response.data)
        resolve(response);
      },
      (error) => {
        reject(error);
      }
      )
    })
  }
}

