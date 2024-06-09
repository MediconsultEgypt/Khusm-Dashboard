import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrokerNameService } from '../broker-name.service';

@Component({
  selector: 'app-getById-broker-name',
  templateUrl: './getById-broker-name.component.html',
  styleUrls: ['./getById-broker-name.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdBrokerNameComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  //broker name
  broker_name: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _BrokerNameService: BrokerNameService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._BrokerNameService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._BrokerNameService.getByID(id)
      .then((res) => {
        this.broker_name = res;
        console.log(this.broker_name)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}