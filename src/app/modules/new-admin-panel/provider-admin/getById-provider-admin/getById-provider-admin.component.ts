import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProviderAdminService } from '../provider-admin.service';

@Component({
  selector: 'app-getById-provider-admin',
  templateUrl: './getById-provider-admin.component.html',
  styleUrls: ['./getById-provider-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderAdminComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  //provider admin
  provider_admin: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderAdminService: ProviderAdminService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderAdminService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });

    this.getById(this.lastValue);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }

  getById(id: number ) {
    this._ProviderAdminService.getByID(id)
      .then((res) => {
        this.provider_admin = res;
        console.log(this.provider_admin)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}