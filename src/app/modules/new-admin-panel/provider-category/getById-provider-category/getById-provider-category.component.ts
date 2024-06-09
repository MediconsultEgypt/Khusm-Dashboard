import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProviderCategoryService } from '../all-provider-category.service';

@Component({
  selector: 'app-getById-provider-category',
  templateUrl: './getById-provider-category.component.html',
  styleUrls: ['./getById-provider-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderCategoryComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  //provider category
  provider_category: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderCategoryService: ProviderCategoryService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderCategoryService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._ProviderCategoryService.getByID(id)
      .then((res) => {
        this.provider_category = res;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}