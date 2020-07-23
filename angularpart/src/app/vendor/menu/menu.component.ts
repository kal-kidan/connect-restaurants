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
  public user;
  public id;
  public menus;
  public showMenu = false;
  ngOnInit() {
    this.menuForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        category: ['', [Validators.required]],
        detail: [''],
      }
    );

    this.requestHandler.getUser().
      subscribe((data) => {
        this.user = data;
        this.id = this.user.id;
      },
        (error) => {
          console.log(error)
        });

    this.getMenu();


  }

  private counter = 0;

  addMenu(list) {
    this.menuForm.value.vendorid = this.id;
    this.requestHandler.addMenu(this.menuForm.value).
      subscribe((data: any) => {
        this.hideList(list);
        this.getMenu();

      },
        (error) => {
          console.log("error", error);
        })
  }
 

  deleteMenu(id, list) {
    this.requestHandler.deleteMenu(id).
      subscribe((data) => { 
        this.hideList(list);
        this.getMenu();
      },
        (error) => {
          console.log("error deleting data", error);
        });
  }
  hideList(list) {
    for (let i = 0; i < list.children.length; i++) {
      let li = list.children[i];
      li.hidden = true;
    }
  }
  editMenu() {

  }

  getMenu() {
    this.requestHandler.getMenu().
      subscribe((data) => {
        this.menus = data;
      },
        (error) => {
          console.log(error);
        });
  }


}

