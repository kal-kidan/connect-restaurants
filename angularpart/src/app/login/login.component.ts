import { Router } from '@angular/router';
import { TokenService } from './../services/token.service';
import { RequestHandlerService } from './../services/request-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
public loginForm; 
public loginError={error:false,errorMessage:''};
  constructor(private requestHandler: RequestHandlerService, private token:TokenService, private router : Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
   });
   
  }
  onSubmit(){
   
    if(this.loginForm.valid){ 
      this.requestHandler.customerLogin(this.loginForm.value).subscribe(
        data=>{ 
          this.handleResponse(data);   
          if(data['role']=="customer"){ 
            this.router.navigate(['customer-home']);
          }
          else if(data['role']=="vendor"){     
            this.router.navigate(['vendor-home']);
          } 

        },
        error=>{
          this.loginError.errorMessage=error.error.error;
          this.loginError.error=true;
          
        }
      )
    }
     
  }
  handleResponse(data){ 
    this.token.set(data.access_token, data.id);
    this.requestHandler.setUser();
  }


}
