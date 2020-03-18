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
  constructor(private apiHandler: RequestHandlerService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
   });
   
  }
  onSubmit(){
   
    if(this.loginForm.valid){
      console.log("valid");
      this.apiHandler.customerLogin(this.loginForm.value).subscribe(
        data=>console.log(data),
        error=>{
          this.loginError.errorMessage=error.error.error;
          this.loginError.error=true;
          console.log()
        }
      )
    }
     
  }

}
