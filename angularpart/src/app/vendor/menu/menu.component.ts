import { RequestHandlerService } from './../../services/request-handler.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private fb: FormBuilder, private requestHandler: RequestHandlerService) { }
  public menuForm;
  ngOnInit() {
    this.menuForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        category: ['', [Validators.required]],
        details: [''],
      } 
    );
  }

  addMenu(){
    this.requestHandler.addMenu(this.menuForm.value).
      subscribe((data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      })
  }

}
