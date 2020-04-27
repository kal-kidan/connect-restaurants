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
    this.Data =this.requestHandler.getUser();
    this.uploadFile = this.fb.group(
      {
        file: ['', [Validators.required]]
      } 
    );
  
   this.coverImage="./../../../assets/images/coverPic.png"; 
    if(this.Data.coverImage!=null && this.Data.coverImage!=''){
      this.coverImage = "http://localhost:8000/" + this.Data.coverImage.toString();    
    } 
    
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
