import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { FamilyMemberAdminService } from '../family-member-admin.service';

@Component({
  selector: 'app-getById-family-member',
  templateUrl: './getById-family-member.component.html',
  styleUrls: ['./getById-family-member.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdFamilyMemberComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // family member data
  member: any = {};
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _FamilyMemberAdminService: FamilyMemberAdminService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._FamilyMemberAdminService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
    this._FamilyMemberAdminService.getByID(id)
      .then((res) => {
        this.member = res;
        // this.category = this.member.category;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}