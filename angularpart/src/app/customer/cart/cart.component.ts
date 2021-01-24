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
  public order:{};
  public orderItems:[];
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
   let orderTypeError = this.orderForm.get('orderType').errors;
   if(orderTypeError){
      this.message = "please select order type.";
      return this.openModal(template);
   }
   let latitude = localStorage.getItem("order-latitude");
   let longitude = localStorage.getItem("order-longitude");
  
   if(this.orderForm.get('orderType').value=="takeaway"){
    let locationError = this.orderForm.get('location').errors;
    if(locationError){
      this.message = "please select location.";
      return this.openModal(template);
     }
     if(!(latitude||longitude)){
      this.message = "we couldn't get your location, please select your location again.";
      return this.openModal(template);
     }
     this.order ={vendor_id: this.menus[0].vendorId, user_id: parseInt(localStorage.getItem("id")), latitude,
     longitude, total: this.totalPrice, sub_total: this.totalPrice, order_type: this.orderForm.get('orderType').value
      }
   }
   else{
    this.order ={vendor_id: this.menus[0].vendorId, user_id: parseInt(localStorage.getItem("id")),
    total: this.totalPrice, sub_total: this.totalPrice, order_type: this.orderForm.get('orderType').value
     }
   }
  

    let orderItems = this.menus;
    orderItems.map((item)=>{
      item.user_id = parseInt(localStorage.getItem("id"));  
    })

    this.request.placeOrder(this.order, orderItems).subscribe((res)=>{
      this.menus = [];
      console.log(res);
    }, 
    (err)=>{
      this.message = err.error.message;
      console.log(err); 
      return this.openModal(template);
      
    })
  }

  onLocationSelect(selectedValue){
    if(selectedValue == "current-location"){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{ 
          this.latitude = position.coords.latitude - 0.136838;
          this.longitude = position.coords.longitude + 0.062129;
          localStorage.setItem("order-latitude", this.latitude);
          localStorage.setItem("order-longitude", this.longitude);
        });
      }
    }
    else if(selectedValue == "another-location"){
      this.route.navigate([]).then(result => {  window.open( '/choose-location', '_blank'); });;
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
