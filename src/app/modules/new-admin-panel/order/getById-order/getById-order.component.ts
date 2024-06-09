import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-getById-order',
  templateUrl: './getById-order.component.html',
  styleUrls: ['./getById-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdOrderComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // order
  order: any = {};
  category: any[];
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _OrderService: OrderService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._OrderService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._OrderService.getByID(id)
      .then((res) => {
        this.order = res;
        this.category = this.order.category;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}