import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
public togglePasswordValue = 'show';
public registrationForm;
public disableSubmit=false;
public startLoading=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstname:[''],
        lastname:[''],
        email:[''],
        phonenumber:[''],
        password:[''],
      }
    );
  }
  togglePassword($input) {
    if ( $input.type === 'password' ) {
      $input.type = 'text' ;
      this.togglePasswordValue = 'hide';
    } else {
      $input.type = 'password' ;
      this.togglePasswordValue = 'show';
    }
  }

  onSubmit(){
      this.disableSubmit=true;
      this.startLoading=true;
      console.log("it is working");
  }

}
