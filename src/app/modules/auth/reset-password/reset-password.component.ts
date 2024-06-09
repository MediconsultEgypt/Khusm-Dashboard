import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'
import { IResendData, IResetPassData, ResetPassData, resendData, IverifyData, verifyData } from '../auth.model';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  phone: any;

  // flags
  is_hide: boolean = false;
  is_smsSent: boolean = false;
  is_smsConfirmed: boolean = false;

  // verify code
  codeArr: number[] = [0, 1, 2, 3, 4, 5];
  codeValue: string[] = [];

  //* send forget password sms
  // phone form
  phoneForm = new FormGroup({
    phone: new FormControl(null, [Validators.required])
  });

  // verify sms sent
  verifyPhoneForm = new FormGroup({
    phone: new FormControl(null, [Validators.required]),
  });

  // reset password form
  resetPasswordForm = new FormGroup({
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  isError: boolean = false;
  screen: string = 'emailScreen';
  successMsg: string;
  emailProcessing: boolean = false;
  serverError: boolean = false;
  token:any = '';
  constructor(private activatedRoute: ActivatedRoute,private authService:AuthService, private router: Router, private _toastrService: ToastrService, private messageService: MessageService) {
    // this.activatedRoute.queryParams.subscribe(queryParams => {
    //   if (queryParams.token) {

    //      this.token = queryParams.token;
    //      this.screen = 'passwordScreen'
    //   }
    // });
  }

  phoneValidator(control: FormControl) {
    const phoneValue = control.value;
    if (phoneValue && !/^\d+$/.test(phoneValue)) {
      return { invalidPhone: true };
    }
    return null;
  }

  onPhoneScreenClick(){
    this.isError = false;
    this.emailProcessing = true;
    let send_sms_Data: IResendData = new resendData();
    send_sms_Data.phone = this.phoneForm.value.phone;
    this.authService.sendForgetsms(send_sms_Data)?.subscribe((res:any)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res.details });
      this.is_hide = true;
      this.is_smsSent = true;

    }, err=>{
      this.isError = true;
      this.is_hide = false;
      this.is_smsSent = false;
      this.successMsg = 'There is Problem in sending phone';
    })
  }

  verifyPhone(){
    this.serverError = false;
    for (let index = 0; index < this.codeArr.length; index++) {
      this.codeValue.push();
    }
    let verifyPhoneData: IverifyData = new verifyData()
    verifyPhoneData.phone = this.verifyPhoneForm.value.phone;
    verifyPhoneData.code = this.codeValue.join('');
    // if(!this.validForm()){
    //   return
    // }
    this.authService.confirmSmsCode(verifyPhoneData)?.subscribe((res:any)=>{
      if(res.status === 'created'){
        // this.router.navigate(['/dashboard']);
        this.is_smsConfirmed = true;
      }

    }, err=>{
      this.serverError = true;
      this.is_smsConfirmed = false;
    })
  }

//   resend code
  resendCode(){
    let phone: IResendData = new resendData();
    phone.phone = this.verifyPhoneForm.value.phone;
    this.authService.resendCode(phone)?.subscribe((res:any)=>{
        if(res.status === 'success'){
        //   this.router.navigate(['/dashboard']);
        this.messageService.add({ severity: 'success', detail: res.details });
        }
  
      }, err=>{
        this.serverError = true;
        this.messageService.add({ severity: 'error', detail: err.details });
      })
  }


  onResetPassword(){
   this.isError = false;
   let reset_pass_Data: IResetPassData = new ResetPassData();
    reset_pass_Data.phone = this.resetPasswordForm.value.phone;
    reset_pass_Data.password = this.resetPasswordForm.value.password;
    this.authService.resetPassword(reset_pass_Data)?.subscribe((res:any)=>{
      this.messageService.add({ severity: 'success', detail: res.details });
      this.router.navigate(['login']);
    }, err=>{
      this.isError = true;
    //   this.successMsg = 'There is Problem in sending phone';
    this.messageService.add({ severity: 'error', summary: 'Error' });
    })

  }

  onPhoneChanged(phone: string) {
    // Update the 'phone' form control value in your form group
    this.phoneForm.get('phone').setValue(phone);
  }

}
