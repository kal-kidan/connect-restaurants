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
  public notificationNumber:any;
  ngOnInit() {
     this.requestHandler.getUser().
        subscribe((data:any)=>{
            this.Data =data;
            this.cafename = this.Data.cafename;
            this.id = this.Data.id; 
            setInterval(()=>{
              this.updateNotification(data.id);
            }, 2000);
         },
         (error)=>{
           console.log(error);
          }
         );
    
  }
  updateNotification(vendor_id){ 
    this.requestHandler.getOrderCount(vendor_id).subscribe((orderCount:any)=>{
      let audio = new Audio();
        audio.src = "assets/audio/alert.mp3";
      if(this.notificationNumber == '' && orderCount>0){
        audio.load();
        audio.play();
      }
      if(parseInt(orderCount) > parseInt(this.notificationNumber)){
        audio.load();
        audio.play();
      } 
      if(orderCount>0){ 
        this.notificationNumber = orderCount;
      } 
      else{
        this.notificationNumber = '';
      }
    }, (err)=>{
      console.log(err);  
    })
  }
  showNotification(){
    console.log("clicked");
    
    document.getElementById("notificationCard").style.display="block"
    if( document.getElementById("notificationCard").style.display == "none"){
      document.getElementById("notificationCard").style.display="block"
    }
    else{
      document.getElementById("notificationCard").style.display="none"
    }
    ;
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
