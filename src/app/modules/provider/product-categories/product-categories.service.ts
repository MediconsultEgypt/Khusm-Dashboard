import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductCategoriesService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }




  // get product categories list
  get_product_cat_list(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.api_url}product-category/`).subscribe((response: any) => {
        resolve(response);
        // this._toastrService.success(response.message);
      },
      (error) => {
        reject(error);
        // this._toastrService.error(error);
      }
      )
    })
  }
}

