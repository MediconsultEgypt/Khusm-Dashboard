import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProviderCategoriesListService implements Resolve<any> {
  public onUserListChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient,) {
    this.onUserListChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // No additional resolving required for adding a new vehicle model
    return null;
  }




  // get provider categories list
  get_prov_cat_list(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.api_url}categories/`).subscribe((response: any) => {
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


// import { IFileASync, IAddFileRequest, IEditFileRequest, IFileResult } from './../../Data-Models/files.model';
// import {
//   GeneralProcessAPI,
//   ID,
//   IResponse,
//   ServicesBase,
// } from 'src/app/shared/ServicesBase';
// import {
//   HttpHeaders,
//   HttpParams,
//   HttpResponseBase,
// } from '@angular/common/http';
// import { Injectable, Injector } from '@angular/core';
// import {
//   mergeMap as _observableMergeMap,
//   catchError as _observableCatch,
// } from 'rxjs/operators';
// import {
//   Observable,
//   throwError as _observableThrow,
//   of as _observableOf,
// } from 'rxjs';
// // import { AppConfigService } from 'src/app/app-config/app-config.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class FileService extends ServicesBase {
//   FILE_BACKEND: string = this.BACKEND + 'ServiceFile/';
//   constructor(injector: Injector, ) {
//     super(injector);
//   }
//   //GetAll
//   getAllFiles(ServiceId: string): Observable<IResponse<IFileASync>> {
//     let url_ = this.FILE_BACKEND + 'GetAll';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//       params: new HttpParams().set('ServiceId', ServiceId),
//     };

//     return this.http
//       .request('get', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<IFileASync>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<IFileASync>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<IFileASync>
//             >;
//         })
//       );
//   }

//   //Add
//   addFile(body: IAddFileRequest): Observable<IResponse<ID>> {
//     let url_ = this.FILE_BACKEND + 'Add';
//     url_ = url_.replace(/[?&]$/, '');

//     const content_ = JSON.stringify(body);

//     let options_: any = {
//       body: content_,
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//     };
//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<ID>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<ID>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<ID>
//             >;
//         })
//       );
//   }

//   //Edit
//   editFile(body: IEditFileRequest): Observable<IResponse<ID>> {
//     let url_ = this.FILE_BACKEND + 'Update';
//     url_ = url_.replace(/[?&]$/, '');

//     const content_ = JSON.stringify(body);

//     let options_: any = {
//       body: content_,
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//     };
//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<ID>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<ID>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<ID>
//             >;
//         })
//       );
//   }

//   //Delete img
//   deleteFile(documentId: string): Observable<IResponse<ID>> {
//     let url_ = this.FILE_BACKEND + 'DeleteImage';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//       params: new HttpParams().set('documentId', documentId),
//     };

//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<ID>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<ID>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<ID>
//             >;
//         })
//       );
//   }

//   //GetFileByID
//   getByID(id: string): Observable<IResponse<IFileResult>> {
//     let url_ = this.FILE_BACKEND + 'GetById';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//       params: new HttpParams().set('id', id),
//     };

//     return this.http
//       .request('get', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<IFileResult>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<IFileResult>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<IFileResult>
//             >;
//         })
//       );
//   }

//   //delete selectes rows
//   deleteSelectedFiles(body: string[]): Observable<IResponse<ID[]>> {
//     let url_ = this.FILE_BACKEND + 'SoftRangeDelete';
//     url_ = url_.replace(/[?&]$/, '');

//     const content_ = JSON.stringify(body);

//     let options_: any = {
//       body: content_,
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//     };

//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<ID[]>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<ID[]>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<ID[]>
//             >;
//         })
//       );
//   }
//   //DELETE IMG
//   deleteImage(id: string): Observable<IResponse<ID>> {
//     let url_ = this.FILE_BACKEND + 'DeleteImage';
//     url_ = url_.replace(/[?&]$/, '');

//     let options_: any = {
//       observe: 'response',
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         Accept: 'text/plain',
//       }),
//       params: new HttpParams().set('id', id),
//     };

//     return this.http
//       .request('post', url_, options_)
//       .pipe(
//         _observableMergeMap((response_: any) => {
//           return GeneralProcessAPI(response_);
//         })
//       )
//       .pipe(
//         _observableCatch((response_: any) => {
//           if (response_ instanceof HttpResponseBase) {
//             try {
//               return GeneralProcessAPI<IResponse<ID>>(
//                 response_ as any
//               );
//             } catch (e) {
//               return _observableThrow(e) as any as Observable<
//                 IResponse<ID>
//               >;
//             }
//           } else
//             return _observableThrow(response_) as any as Observable<
//               IResponse<ID>
//             >;
//         })
//       );
//   }
// }
