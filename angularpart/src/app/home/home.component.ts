import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
public searchForm;
  ngOnInit() {
    this.searchForm = new FormGroup({
      searchItem: new FormControl('')
   });
  }

}
