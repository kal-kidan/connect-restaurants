import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from './../services/request-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private requestHandler: RequestHandlerService) { }
public searchForm;
  ngOnInit() {

   
  }

}
