import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from './../../services/request-handler.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {

  constructor(private requestHandler: RequestHandlerService) { }
  public searchForm;

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchItem: new FormControl('')
   });
  }
}
