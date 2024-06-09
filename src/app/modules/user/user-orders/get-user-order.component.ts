import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { UserOrdersService } from './get-user-order.service';
import { userOrderData } from './get-user-order.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-get-user-order',
  templateUrl: './get-user-order.component.html',
  styleUrls: ['./get-user-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetUserOrdersComponent implements OnInit, OnDestroy {

  // user orders data
  data: userOrderData;
  user_id: number;
  is_found: boolean = false;

  userIdForm = new FormGroup({
    user_id: new FormControl(null, [Validators.required]),
  });
  

  constructor(private router: Router, private _UserOrdersService: UserOrdersService, private messageService: MessageService) {}

  ngOnInit(): void {
    // this.getOrder(6940);
  }


  ngOnDestroy(): void {
  }

  getOrder() {
    this.user_id = this.userIdForm.value.user_id;
    this._UserOrdersService.getUserOrders(this.user_id)
    .then((res) => {
          this.is_found = true;
        this.data = res;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.detail });
        // this.category = this.data.category;
      })
      .catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Not found', detail: error.detail });

        // Handle the error
        // console.error(error);
      });
  }
}