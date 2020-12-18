import { RequestHandlerService } from './../../services/request-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  constructor( private requestHandler: RequestHandlerService) { }
  public vendor = {};
  public cafename;
  public Data;
  public id;
  ngOnInit() {
     this.requestHandler.getUser().
        subscribe((data)=>{
            this.Data =data;
            this.cafename = this.Data.cafename;
            this.id = this.Data.id; 
         },
         (error)=>{
           console.log(error);
          }
         );
    
  }
  w3_open() {
    document.getElementById("sidebarofcafereg").style.display = "block";
  }
  w3_close() {
    document.getElementById("sidebarofcafereg").style.display = "none";
  }
  list() {
    let element = document.getElementById("dropDown");
    let elementClassName = element.className;
    let dropDownContent = document.getElementById("dropDownContent");
    if (elementClassName.indexOf("fa fa-caret-up") === -1) {
      element.className = "fa fa-caret-up";
      dropDownContent.style.display = "block"; 
    }
    else {
      element.className = "fa fa-caret-down";
      dropDownContent.style.display = "none";
    }


  }

}
