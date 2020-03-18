import { RequestHandlerService } from './../services/request-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
public emailError={error:false,message:''};
public url="http://localhost:8000/api/auth/signup";
  constructor(private fb: FormBuilder, private apiRequest :RequestHandlerService ,private router:Router){ }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstname:[''],
        lastname:[''],
        gender:['',[Validators.required]],
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
      this.apiRequest.customerSignUp(this.registrationForm.value).subscribe(
         data=>console.log(data),
        error=>{ 
          this.emailError.error=true;
          this.emailError.message=error.error.errors.email[0];  
        }
      )
      setTimeout(()=>{
       this.router.navigate(['/customer-login']);
      },4000);
      
  }

}
