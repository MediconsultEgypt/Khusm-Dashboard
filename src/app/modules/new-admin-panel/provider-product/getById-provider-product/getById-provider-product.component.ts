import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProviderProductService } from '../provider-product.service';

@Component({
  selector: 'app-getById-provider-product',
  templateUrl: './getById-provider-product.component.html',
  styleUrls: ['./getById-provider-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderProductComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // provider product
  product: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _MostVisitedService: ProviderProductService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._MostVisitedService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._MostVisitedService.getByID(id)
      .then((res) => {
        this.product = res;
        console.log(this.product)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}