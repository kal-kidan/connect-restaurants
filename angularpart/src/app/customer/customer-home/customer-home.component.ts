import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VistorService } from 'src/app/services/vistor.service';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  showSideBar = false;
  searchInputVisible = false;
  searchForm; 
  vendors;
  latitude;
  longitude;  
  user_id;
  routeUrl = "http://127.0.0.1:8000/";  
  favoriteActive=false;
  constructor(private request: RequestHandlerService, private tokenService: TokenService) { }
 
  ngOnInit() {
    this.searchForm = new FormGroup({
      searchedItem: new FormControl('')
   });
   this.user_id = this.tokenService.getData().id;
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{ 
      this.latitude = position.coords.latitude - 0.136838;
      this.longitude = position.coords.longitude + 0.062129;
      console.log(this.latitude, this.longitude);
      
      this.request.getNearestVendors(this.latitude, this.longitude).subscribe((res: any) => {
        this.vendors = res; 
        if(res.is_favorite){
          this.favoriteActive = true;
        }
        else{
          this.favoriteActive = false;
        }
      console.log(res); 

  })
    });
  }
 
  //  this.visitorService.getIpAddress().subscribe(res => {

  //   this.ipaddress = res['ip'];
  //   this.visitorService.getGEOLocation(this.ipaddress).subscribe(res => {

  //     this.latitude = res['latitude'];
  //     this.longitude = res['longitude'];
  //     this.currency = res['currency']['code'];
  //     this.currencysymbol = res['currency']['symbol'];
  //     this.city = res['city'];
  //     this.country = res['country_code3'];
  //     this.isp = res['isp'];
  //     console.log(res);
  //   });
    //console.log(res);

  // });
}
  toggleFavorite(vendor_id){
    let data = {user_id: this.user_id, vendor_id}
    this.request.toggleFavorite(data).subscribe((res)=>{
      this.favoriteActive = ! this.favoriteActive;
      console.log(res);
      
    }, (err)=>{
      console.log(err);
      
    })
  }

  showsideBar() {
    this.showSideBar = true;
  }
  closeSideBar() {
    this.showSideBar = false;
  }
  showSearchInput() {
    this.searchInputVisible = true;
  }
}
