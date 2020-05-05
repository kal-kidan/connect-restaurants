import { async } from '@angular/core/testing';
import { RequestHandlerService } from './../../services/request-handler.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
// import {imageValidator} from './../validators/imagevalidator';
@Component({
  selector: 'app-home-vendor',
  templateUrl: './home-vendor.component.html',
  styleUrls: ['./home-vendor.component.css']
})
export class HomeVendorComponent implements OnInit {

  public coverImage="./../../../assets/images/coverPic.png";
  public Data;
  public uploadFile;
  public fileToUpload: File;
  constructor(private token: TokenService, private fb: FormBuilder, private requestHandler: RequestHandlerService) { }

   ngOnInit() {
    this.requestHandler.getUser().
    subscribe((data)=>{
        this.Data =data;
        if(this.Data.coverimage!=null && this.Data.coverimage!=''){
          this.coverImage = "http://localhost:8000/" + this.Data.coverimage.toString();    
        } 
        else{
          this.coverImage="./../../../assets/images/coverPic.png"; 
        } 
     },
     (error)=>{
       console.log(error);
      }
     );
    this.uploadFile = this.fb.group(
      {
        file: ['', [Validators.required]]
      } 
    );    
  }
  showForm($uploadForm, $changeCover){
    $uploadForm.style.display="block";
    $changeCover.hidden = true; 
  }
  fileChange(files: FileList){
    this.fileToUpload = files.item(0);
  }
  upload(){  
    this.requestHandler.postFile(this.fileToUpload).
      subscribe((data)=>{
       this.coverImage = "http://localhost:8000/" + data.toString(); 
      },
      (error)=>{
        console.log(error);
      });
  }

}
