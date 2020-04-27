import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  showSideBar = false;
  searchInputVisible = false;
  searchForm;
  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchItem: new FormControl('')
   });
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
