import { Router } from '@angular/router';
import { TokenService } from './../services/token.service';
import { RequestHandlerService } from './../services/request-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

public loginForm;
public loginError={error:false,errorMessage:''};
  constructor(private apiHandler: RequestHandlerService, private token:TokenService, private router : Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
   });
   
  }
  onSubmit(){
   
    if(this.loginForm.valid){ 
      this.apiHandler.customerLogin(this.loginForm.value).subscribe(
        data=>{ 
          this.handleResponse(data);
          this.router.navigate(['customer-home']);
          console.log(data);

        },
        error=>{
          this.loginError.errorMessage=error.error.error;
          this.loginError.error=true;
          
        }
      )
    }
     
  }
  handleResponse(data){ 
    this.token.handle(data.access_token);

  }

}
