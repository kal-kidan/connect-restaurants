import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url="http://localhost:8000"
  vendor={}
  schedules=[]
  menus=[]
  id: Number
  likeStyle={'font-size':'18px', 'cursor': 'pointer'}
  totalLikes;
  statusClass = "w3-green w3-round  w3-text-white" || "closed w3-round w3-text-white"
  constructor(private request: RequestHandlerService) {

  }

  ngOnInit() {
      this.request.getVendorInfo(2).subscribe(
        (data: any)=>{
          this.vendor = data.user
          this.schedules = data.schedules
          this.menus = data.menus
          console.log(data.user)
        },
        (err)=>{
          console.log("error fetching vendor info", err)

        }
      )
  }

  toggleDetails(id){
    let detialId = 'detail' + id
    let buttonId = 'button' + id
    let details = document.getElementById(detialId)
    let button = document.getElementById(buttonId)
    if(  details.style.display == "none"){
      details.style.display = "block"
      button.innerHTML = "Hide Details"
    }
    else{
      details.style.display = "none"
      button.innerHTML = "Show Details"
    }

  }

}
