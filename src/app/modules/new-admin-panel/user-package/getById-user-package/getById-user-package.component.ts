import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserPackageService } from '../user-package.service';

@Component({
  selector: 'app-getById-user-package',
  templateUrl: './getById-user-package.component.html',
  styleUrls: ['./getById-user-package.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdUserPackageComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // package
  package: any = {};
//   category: any[];
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _UserPackageService: UserPackageService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._UserPackageService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._UserPackageService.getByID(id)
      .then((res) => {
        this.package = res;
        // this.category = this.package.category;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}