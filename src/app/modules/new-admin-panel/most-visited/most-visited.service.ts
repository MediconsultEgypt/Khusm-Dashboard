import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable()
export class MostVisitedService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }




  // get most visited list
  get_most_visited(page: number): Observable<any> {
    const params = new HttpParams().set('page', String(page));
    return this._httpClient.get<any[]>(`${environment.api_url}most_visited_admin/`, {params });
  }

    // get most visited (by id)
    getByID(id: number): Promise<any[]> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(`${environment.api_url}most_visited_admin/${id}`).subscribe((response: any) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
        )
      })
    }
}

