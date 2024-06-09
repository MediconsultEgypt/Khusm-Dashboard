import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProviderRateService } from '../provider-rate.service';

@Component({
  selector: 'app-getById-provider-rate',
  templateUrl: './getById-provider-rate.component.html',
  styleUrls: ['./getById-provider-rate.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderRateComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // provider rate
  rate: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderRateService: ProviderRateService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderRateService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._ProviderRateService.getByID(id)
      .then((res) => {
        this.rate = res;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}