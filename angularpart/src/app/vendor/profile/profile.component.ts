import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  url="http://localhost:8000/"
  vendor={}
  schedules=[]
  menus=[]
  display = false
  id: Number
  likeStyle={'font-size':'18px', 'cursor': 'pointer'}
  totalLikes;
  statusClass = "w3-green w3-round  w3-text-white" || "closed w3-round w3-text-white"
  constructor(private request: RequestHandlerService,private ativatedRouter: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
   this.ativatedRouter.paramMap.subscribe(params=>{
    this.id=parseInt(params.get('id'))
   })
      this.request.getVendorInfo(this.id).subscribe(
        (data: any)=>{
          this.vendor = data.user[0]
          this.schedules = data.schedules
          this.menus = data.menus
          this.display = true;
        },
        (err)=>{
            return this.router.navigateByUrl('/pagenotfound')
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


  addToCart(menu){
    let datas:any = {}
    let addCartButton: any = document.getElementById(`cart-plus${menu.id}`); 
    addCartButton.disabled  = true;
    addCartButton.className = "fa fa-spinner w3-margin-right cart";
    datas.vendor_id = menu.vendorid;
    datas.menu_id = menu.id;
    this.request.addToCart(datas).subscribe(
      (data)=>{
        addCartButton.disabled  = false;
        addCartButton.className = "fa fa-spinner w3-margin-right cart";
        console.log(data)
      }, (err)=>{
        addCartButton.disabled  = false;
        addCartButton.className = "fa fa-cart-plus w3-margin-right cart";
        console.log("error adding cart", err)
      }
    )
  }

}
