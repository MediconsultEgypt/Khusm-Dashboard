import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PackagePromoCodeService } from '../package-promo-code.service';

@Component({
  selector: 'app-getById-package-promo-code',
  templateUrl: './getById-package-promo-code.component.html',
  styleUrls: ['./getById-package-promo-code.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdPackagePromoCodeComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // promo code
  promo_code: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _PackagePromoCodeService: PackagePromoCodeService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._PackagePromoCodeService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._PackagePromoCodeService.getByID(id)
      .then((res) => {
        this.promo_code = res;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}