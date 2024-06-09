import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-phone-validation',
    templateUrl: './phone-validation.component.html',
    styleUrls: ['./phone-validation.component.scss'],
})

export class PhoneValidationComponent implements OnInit {
    phoneForm: FormGroup;
    phone: any;

    @Output() phoneChange = new EventEmitter<string>();

    constructor(private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.phoneForm = this.fb.group({
        phone: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.stringValidator, Validators.pattern(/^(01\d*)$/)])
      });
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

    emitPhoneValue() {
        this.phone = this.phoneForm.value.phone;
        this.phoneChange.emit(this.phone);
      }


  }
