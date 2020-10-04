import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { RequestHandlerService } from './../../services/request-handler.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {passwordValidator} from './validator'
@Component({
  selector: 'app-vendor-signup',
  templateUrl: './vendor-signup.component.html',
  styleUrls: ['./vendor-signup.component.css']
})
export class VendorSignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private requestHandler: RequestHandlerService, private token: TokenService, private router: Router) { }

  public registrationForm;
  public disableSubmit=false;
  public emailError ={error: false, message:''};
  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        email:['', [Validators.required]],
        password:['', [Validators.required]],
        confirmpassword:['', [Validators.required]]
      },
      {validator: passwordValidator}
    );
  }

  closeMessage(){
    document.getElementById('register_message').style.display='none';
  }

  onSubmit(){
    this.disableSubmit=true;
    this.registrationForm.value.role = "vendor";
    this.requestHandler.signup(this.registrationForm.value).
    subscribe(
      data=>{
        this.handleResponse(data);
        this.requestHandler.setUser();
      },
      error=>{
        this.emailError.error = true;
        this.emailError.message = error.error.error;

      }
    )

  }

  handleResponse(data){
    this.token.set(data.access_token, data.id);
    this.router.navigate(['vendor-home']);
  }
}
