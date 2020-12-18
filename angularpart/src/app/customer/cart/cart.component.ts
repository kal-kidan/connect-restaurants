import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
 @Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   
  public menus = []
  public totalPrice=0;
  public trashIconDisabled = false;
  constructor(private request: RequestHandlerService) {
    
   }

  ngOnInit() {
    this.request.getCarts().subscribe(
      (data:any)=>{
        this.menus = data.carts;
        for(let menu of this.menus){
          this.totalPrice += menu.price
        }
      },
      (err)=>{
        console.log("error fetching carts", err)
      }
    )

  }

  deleteCart(id, index){
    let deleteButton: any = document.getElementById(`delete-btn${id}`);
    deleteButton.disabled  = true;
    this.request.deleteCart(id).subscribe(
      (data)=>{
        this.menus = this.menus.filter(menu=>menu.id!=id)
        this.updateQuantity(this.menus);
        deleteButton.disabled  = false;
      },
      (error)=>{
        console.log("error occured deleting cart", error)
      }
    )
  }
  updateQuantity(menus){ 
    let quantities: any = document.getElementsByClassName("quantitys"); 
    let total = 0; 
    for (let i = 0; i < menus.length; i++) {  
       total = total +( menus[i].price * quantities[i].value);
    }
    this.totalPrice = total;
  }

}
