import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FaqAdminService } from '../faq-admin.sevice';

@Component({
  selector: 'app-getById-faq-admin',
  templateUrl: './getById-faq-admin.component.html',
  styleUrls: ['./getById-faq-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdFaqAdminComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // faq
  faq: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _FaqAdminService: FaqAdminService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._FaqAdminService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._FaqAdminService.getByID(id)
      .then((res) => {
        this.faq = res;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}