import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public loginForm;
  public loginError;
  constructor(private fb: FormBuilder, private request: RequestHandlerService, private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ['',[Validators.required]],
        password: ['',[Validators.required]] 
      }
     )
  }

  login(){
    this.request.customerLogin(this.loginForm.value).subscribe(
      data=>{  
        this.handleResponse(data);   
        if(data['role']=="admin"){ 
          this.router.navigate(['admin']);
        }
      },
      error=>{
        this.loginError=error.error.error; 
      }
    )
  }

  handleResponse(data){ 
    localStorage.setItem("role", data.role);
    this.token.set(data.access_token, data.id);
    this.request.setUser();
  }

}
