import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
 @Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   
  public menus = [];
  public totalPrice=0;
  public trashIconDisabled = false;
  public latitude;
  public longitude ;
  public orderForm;
  public modalRef: BsModalRef;
  public message;
  constructor(private request: RequestHandlerService, private formBuilder: FormBuilder, private modalService: BsModalService, private route:Router) {
    
   }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      orderType: ['',[Validators.required]],
      location: ['',[Validators.required]]
    });
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

  placeOrder(template){ 
   let orderTypeError = this.orderForm.get('orderType').errors.required;
   let locationError = this.orderForm.get('location').errors.required;
   if(orderTypeError){
      this.message = "please select order type.";
      return this.openModal(template);
   }
   else if(locationError){
    this.message = "please select location.";
    return this.openModal(template);
   }
  }

  onLocationSelect(selectedValue){
    if(selectedValue == "current-location"){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{ 
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          localStorage.setItem("order-latitude", this.latitude);
          localStorage.setItem("order-longitude", this.longitude);
        });
      }
    }
    else if(selectedValue == "another-location"){
      this.route.navigate(['/choose-location']);
    } 
    
  }

  onOrderTypeSelect(selectedValue){ 
    if(selectedValue == "takeaway"){
      document.getElementById("location-select").style.display = "block";
    }
    else if(selectedValue == "inperson"){
      document.getElementById("location-select").style.display = "none";
    }
    
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

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

}
