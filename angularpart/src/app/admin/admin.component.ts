import { TokenService } from './../services/token.service';
import { RequestHandlerService } from './../services/request-handler.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public registrationForm; 
  public disableSubmit;
  public hideMessage = true;
  public emailError={error:false, message:''};
  constructor(private fb: FormBuilder, private apiRequest :RequestHandlerService, private token: TokenService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group(
     {
       firstname: ['',[Validators.required]],
       lastname: ['',[Validators.required]],
       gender: ['', [Validators.required]],
       email: ['',[Validators.required]],
       phonenumber: ['',[Validators.required]],
       idnumber: ['',[Validators.required]],
       cafename: ['',[Validators.required]]
     }
    )

  }


   w3_open() {
    document.getElementById("sidebarofcafereg").style.display = "block";
  }
   w3_close() {
    document.getElementById("sidebarofcafereg").style.display = "none";
  }

  onSubmit(){ 
    this.disableSubmit = true;
    this.registrationForm.value.role = "vendor";
    this.apiRequest.registerVendor(this.registrationForm.value).subscribe(
       data=>{
        this.disableSubmit = false;
        if(data==true){
          this.hideMessage = false; 
         console.log(data); 
        }
        
        },
      error=>{ 
        this.disableSubmit = false;
        console.log(error);
        this.emailError.error=true;
        this.emailError.message=error.error.errors.email[0];  
      }
    ); 
   
  }

  

}
