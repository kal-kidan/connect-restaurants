import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public registrationForm; 
  public hideMessage = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group(
     {
       firstname: ['',[Validators.required]],
       lastname: ['',[Validators.required]],
       email: ['',[Validators.required]],
       phonenumber: ['',[Validators.required]],
       cafename: ['',[Validators.required]],
       id: ['',[Validators.required]]
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
    this.hideMessage = false;
    console.log(this.registrationForm.value);
    console.log("on submit called");
  }

}
