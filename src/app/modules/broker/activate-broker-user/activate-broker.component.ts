import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { ActivateBrokerUserService } from './activate-broker.service';
import { ActivateBrokerData, IActivateBrokerData } from './activate-broker.model';

@Component({
  selector: 'app-activate-broker',
  templateUrl: './activate-broker.component.html',
  styleUrls: ['./activate-broker.component.scss']
})
export class ActivateBrokerUserComponent {

  // phone form
  activateBrokerForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.pattern(/^[^0-9]*$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]),
    phone : new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.stringValidator, Validators.pattern(/^(01\d*)$/)]),
  });

  isError: boolean = false;
  screen: string = 'emailScreen';
  successMsg: string;
  emailProcessing: boolean = false;
  token:any = '';
  constructor(private activatedRoute: ActivatedRoute,private _ActivateBrokerUserService:ActivateBrokerUserService, private router: Router, private _toastrService: ToastrService, private messageService: MessageService) {
    // this.activatedRoute.queryParams.subscribe(queryParams => {
    //   if (queryParams.token) {

    //      this.token = queryParams.token;
    //      this.screen = 'passwordScreen'
    //   }
    // });
  }

  stringValidator(control: FormControl) {
    const phoneValue = control.value;
    if (phoneValue && !/^\d+$/.test(phoneValue)) {
      return { invalidPhone: true };
    }
    return null;
  }

  numericValidator(control: FormControl) {
    const phoneValue = control.value;
    if (phoneValue && /^(01\d{9})$/.test(phoneValue)) {
      return { invalidNumber: true };
    }
    return null;
}
  
  // onPhoneChanged(phone: string) {
  //   console.log(phone)
  //   // Update the 'phone' form control value in your form group
  //   this.activateBrokerForm.get('phone').setValue(phone);
  // }

  activateBroker(id: number){
    this.isError = false;
    this.emailProcessing = true;
    let confirm_sms_Data: IActivateBrokerData = new ActivateBrokerData();
    confirm_sms_Data.username = this.activateBrokerForm.value.username;
    confirm_sms_Data.password = this.activateBrokerForm.value.password;
    confirm_sms_Data.email = this.activateBrokerForm.value.email;
    confirm_sms_Data.phone = this.activateBrokerForm.value.phone;
    this._ActivateBrokerUserService.activateBroker(2, confirm_sms_Data)?.subscribe((res:any)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
    }, err=>{
      this.isError = true;
    this.messageService.add({ severity: 'error', summary: 'Error' });
    })
  }

}
