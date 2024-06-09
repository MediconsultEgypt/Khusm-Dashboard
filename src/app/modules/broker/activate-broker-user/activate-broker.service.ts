import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../../core/shared/utils/api-handler.service';
import { API_ENDPOINTS, ApiMethod } from '../../../core/shared/utils/const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { user, token } from '../../auth/models/user.model';
import { IActivateBrokerData } from './activate-broker.model';

@Injectable({
  providedIn: 'root'
})
export class ActivateBrokerUserService {

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

  // activate broker user
  activateBroker(id: number, userData: IActivateBrokerData) : Observable <any> {
    return this.httpC.patch<any>(`${environment.api_url}activate_broker_user/${id}`, userData);
  }
}
