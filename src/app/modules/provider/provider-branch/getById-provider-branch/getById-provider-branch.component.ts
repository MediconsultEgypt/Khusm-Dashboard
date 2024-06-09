import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProviderBranchService } from '../provider-branch.service';
import { Allprovider_branch } from '../provider-branch.model';

@Component({
  selector: 'app-getById-provider-branch',
  templateUrl: './getById-provider-branch.component.html',
  styleUrls: ['./getById-provider-branch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderBranchComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  //provider_branch make
  provider_branch: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderBranchService: ProviderBranchService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderBranchService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._ProviderBranchService.getByID(id)
      .then((res) => {
        this.provider_branch = res;
        console.log(this.provider_branch)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}