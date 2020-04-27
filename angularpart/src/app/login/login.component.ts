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
public user:{};
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
          this.user=data;
          if(data['role']=="customer"){
            this.router.navigate(['customer-home']);
          }
          else if(data['role']=="vendor"){
            console.log(data);
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
    this.token.set(data.access_token, data);

  }


}
