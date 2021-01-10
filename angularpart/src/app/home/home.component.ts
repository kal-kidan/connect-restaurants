import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {RequestHandlerService} from './../services/request-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private requestHandler: RequestHandlerService, private fb: FormBuilder) { }
public searchForm;
  ngOnInit() {
    this.searchForm = this.fb.group(
      {
        searchItem: ['', [Validators.required]]
      }
    );
   
  }

}
