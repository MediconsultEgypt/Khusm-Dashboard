import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IsignUpData, signUpData } from '../auth.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'), Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, this.matchPasswords.bind(this)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[^0-9]*$/)]),
    first_name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern(/^[^0-9]*$/)]),
    phone: new FormControl(null, [Validators.required]),
  });
  isError: boolean = false;
  passwordError: boolean = false;
  serverError: boolean = false;
  constructor(private authService:AuthService, private router: Router, private messageService: MessageService) { }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onPhoneChanged(phone: string) {
    // Update the 'phone' form control value in your form group
    this.signupForm.get('phone').setValue(phone);
  }

  onSingUp(){
    this.serverError = false;
    let registerData: IsignUpData = new signUpData();
    registerData.first_name = this.signupForm.value.first_name;
    registerData.last_name = this.signupForm.value.last_name;
    registerData.email = this.signupForm.value.email;
    registerData.password = this.signupForm.value.password;
    registerData.phone = this.signupForm.value.phone;

    this.authService.signUp(registerData)?.subscribe((res:any)=>{
      if(res.status === 'success'){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res });
        this.router.navigate(['/login']);
      }

    }, err=>{
      this.serverError = true;
    })
  }

  ngOnInit(): void {
  }

}
