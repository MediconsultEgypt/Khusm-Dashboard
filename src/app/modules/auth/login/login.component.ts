import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/core/shared/socket.service';
import {AuthService} from '../services/auth.service'
import { navItems } from 'src/app/core/default-layout/_nav';
import { IUserLoginData, IadminLoginData, UserLoginData, adminLoginData } from '../auth.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public navItems = navItems;
  public error = '';

  isUserLogin: boolean = false;
  isAdminLogin: boolean = true;
  isError: boolean = false;
  isSubmitted: boolean = false;


  // userLoginForm = new FormGroup({
  //   phone: new FormControl(null, []),
  //   password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  // });

  AdminLoginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });


  constructor(private authService:AuthService, private router: Router, private messageService: MessageService, private socket: SocketService) {}

  // login() {

  //   this.isSubmitted = true;
  //   let userData: IUserLoginData = new UserLoginData();
  //   userData.phone = this.userLoginForm.value.phone;
  //   userData.password = this.userLoginForm.value.password;
  //   this.authService.login(userData.phone, userData.password).subscribe((res: any) => {
  //     // this.messageService.add({ severity: 'success', detail: res.details });
  //     // console.log(res)
  //     this.router.navigate(['/dashboard']);
  //   }, err=>{
  //     this.messageService.add({ severity: 'error', detail: err.error.details });
  // })

  // }
  moveToForgetPassword(){
    this.router.navigate(['reset-password']);
  }

  // onPhoneChanged(phone: string) {
  //   // Update the 'phone' form control value in your form group
  //   this.userLoginForm.get('phone').setValue(phone);
  // }

  ngOnInit() {
    // Redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  // admin login
  loginAdmin() {
    this.isSubmitted = true;
    let adminData: IadminLoginData = new adminLoginData();
    adminData.username = this.AdminLoginForm.value.username;
    adminData.password = this.AdminLoginForm.value.password;
    this.authService.adminLogin(adminData.username, adminData.password).subscribe((res: any) => {
      // this.messageService.add({ severity: 'success', detail: res.details });
      // console.log(res)
      this.router.navigate(['/']);
    }, err=>{
      this.messageService.add({ severity: 'error', detail: err.error.details });
  })
  }

  goToUserForm() {
    this.isUserLogin = true;
    this.isAdminLogin = false;
  }
}
