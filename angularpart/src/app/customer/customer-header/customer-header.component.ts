import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from './../../services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  constructor(private request: RequestHandlerService, private tokenService: TokenService) { }
  public searchForm;
  public searchInputVisible = false;
  public showSideBar = false;
  public user = {};

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchItem: new FormControl('')
   });

   this.request.getUser().subscribe((res)=>{
     this.user = res; 
     console.log(this.user);
     
   })
  }
  showSearchInput(){
    this.searchInputVisible = !this.searchInputVisible;
  }

  showsideBar(){ 
    this.showSideBar = !this.showSideBar;
  }

  closeSideBar(){
    this.showSideBar = !this.showSideBar;
  }
}
