import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../../core/shared/utils/api-handler.service';
import { API_ENDPOINTS, ApiMethod } from '../../../core/shared/utils/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { token, user } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { IResendData, IResetPassData, IadminLoginData, IverifyData, signUpData } from '../auth.model';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<user>;
  private currentUserSubject: BehaviorSubject<user>;

  constructor(
    private http: ApiHandlerService,
    private httpC: HttpClient,
  ) {
    
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   // getter: currentUserValue
  public get currentUserValue(): user {
    return this.currentUserSubject.value;
  }

  //  login(phone: string, password: string) {
  //   return this.httpC
  //     .post<any>(`${environment.api_url}users/login/`, { phone, password })
  //     .pipe(
  //       map(user => {
  //         if (user.user && user.token.access_token) {
  //           localStorage.setItem('access_token', JSON.stringify(user.token.access_token));
  //           localStorage.setItem('currentUser', JSON.stringify(user.user));
  //           localStorage.setItem('adminID', JSON.stringify(user.user.id) )
            
  //         }

  //         return user;
  //       })
  //     );
  // }

  adminLogin(username: string, password: string ) {
    return this.httpC
      .post<any>(`${environment.api_url}users/pos/login/`, { username, password })
      .pipe(
        map(user => {
          if(user.token && user.user) {
            localStorage.setItem('user_name', user.user.first_name);
            localStorage.setItem('provider_name', user.user.provider_name);
            localStorage.setItem('email', user.user.email);
            localStorage.setItem('access_token', user.token.access_token);

            // Display welcome toast!
            // setTimeout(() => {
            //   this._toastrService.success(
            //     'You have successfully logged in ',
            //     '👋 Welcome, ' + user.user.first_name + '!',
            //     { toastClass: 'toast ngx-toastr', closeButton: true }
            //   );
            // }, 2500);
          }
        })
      );
  }

  signIn(data:any) {
    return this.http.requestCall(API_ENDPOINTS.logIn,ApiMethod.POST,'',data)
  }

  // resetPassword(data:any,token) {
  //   return this.http.requestCall(API_ENDPOINTS.resetPassword,ApiMethod.POST,token,data)
  // }
  forgetPassword(data:any) {
    return this.http.requestCall(API_ENDPOINTS.forgetPassword,ApiMethod.POST,'',data)
  }

  // signUp(data:any) {
  //   return this.http.requestCall(API_ENDPOINTS.signUp,ApiMethod.POST,'',data)
  // }

  signUp(userData: signUpData): Observable<any> {
    return this.httpC.post<any>(`${environment.api_url}users/signup/`, userData);
  }

  logout(){
    localStorage.clear();
  }

  // verify phone
  verifyPhone(userData: IverifyData): Observable<any> {
    return this.httpC.post<any>(`${environment.api_url}users/phone/verify_phone/`, userData);
  }

  // resend verification
  resendCode(userData: IResendData): Observable<any> {
    return this.httpC.post<any>(`${environment.api_url}users/phone/resend_verification_code/`, userData);
  }

  // send forget password sms
  sendForgetsms(userData: IResendData) : Observable <any> {
    return this.httpC.post<any>(`${environment.api_url}users/password/send_reset_sms/`, userData);
  }

  // confirm sms reset password code
  confirmSmsCode(userData: IverifyData) : Observable <any> {
    return this.httpC.post<any>(`${environment.api_url}users/password/check_reset_code/`, userData);
  }

  // reset password
  resetPassword(userData: IResetPassData) : Observable <any> {
    return this.httpC.post<any>(`${environment.api_url}users/password/forget_password/`, userData);
  }
}
