import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VistorService } from 'src/app/services/vistor.service';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

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
  routeUrl = "http://127.0.0.1:8000/";  
  constructor(private request: RequestHandlerService) { }
 
  ngOnInit() {
    this.searchForm = new FormGroup({
      searchedItem: new FormControl('')
   });
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.request.getNearestVendors(this.latitude, this.longitude).subscribe((res: any) => {
        this.vendors = res; 
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
