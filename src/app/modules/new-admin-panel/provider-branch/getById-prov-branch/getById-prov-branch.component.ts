import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProvBranchService } from '../all-p-branch/p-branch.service';

@Component({
  selector: 'app-getById-prov-branch',
  templateUrl: './getById-prov-branch.component.html',
  styleUrls: ['./getById-prov-branch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProvBranchComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // provider branch
  branch: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProvBranchService: ProvBranchService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProvBranchService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._ProvBranchService.getByID(id)
      .then((res) => {
        this.branch = res;
        console.log(this.branch)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  getDirections(latitude: number, longitude: number): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
}