import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OfferBannerService } from '../offer-banner.service';

@Component({
  selector: 'app-getById-offer-banner',
  templateUrl: './getById-offer-banner.component.html',
  styleUrls: ['./getById-offer-banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdOfferBannerComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // offer
  offer: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _OfferBannerService: OfferBannerService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._OfferBannerService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._OfferBannerService.getByID(id)
      .then((res) => {
        this.offer = res;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}