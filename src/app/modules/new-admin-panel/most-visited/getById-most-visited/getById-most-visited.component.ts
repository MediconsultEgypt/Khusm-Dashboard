import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MostVisitedService } from '../most-visited.service';

@Component({
  selector: 'app-getById-most-visited',
  templateUrl: './getById-most-visited.component.html',
  styleUrls: ['./getById-most-visited.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdMostVisitedComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  //most visited
  most_visited: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _MostVisitedService: MostVisitedService) {
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
        this.most_visited = res;
        console.log(this.most_visited)
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}