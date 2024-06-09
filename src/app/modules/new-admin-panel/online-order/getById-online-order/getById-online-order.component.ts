import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnlineOrderService } from '../online-order.service';

@Component({
  selector: 'app-getById-online-order',
  templateUrl: './getById-online-order.component.html',
  styleUrls: ['./getById-online-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdOnlineOrderComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // order
  order: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _OnlineOrderService: OnlineOrderService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._OnlineOrderService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._OnlineOrderService.getByID(id)
      .then((res) => {
        this.order = res;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}