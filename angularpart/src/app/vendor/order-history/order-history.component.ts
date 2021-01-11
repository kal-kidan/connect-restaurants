import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders;
  public vendor_id; 
  public orderItems = {};
  constructor(private request: RequestHandlerService, private tokenService: TokenService) { }

  ngOnInit() {
    this.vendor_id = this.tokenService.getData().id; 
    this.request.getVendorOrders(this.vendor_id).subscribe((data)=>{ 
      this.orders = data;  
    }, (err)=>{
      console.log(err);  
    })
  }

  getOrderItems(orderId){
    let orderItems;
    this.request.getOrderItems(orderId).subscribe((data)=>{ 
      orderItems = data;  
    }, (err)=>{
      console.log(err);  
    });
    return orderItems;
  }

  showOrders(orderId, seen){
    if(!seen){
        console.log("not seen");
    }
    this.request.getOrderItems(orderId).subscribe((data)=>{ 
      let propertyName = "orderId" + orderId;
      this.orderItems[propertyName] = data; 
      console.log(this.orderItems[propertyName]);
      
      let chosenButton=document.getElementById("button"+orderId);
      if (chosenButton.innerHTML=="Show Order") {
           chosenButton.innerHTML="Hide Order";
           document.getElementById("div"+orderId).style.display='block';
      }
      else {
           chosenButton.innerHTML="Show Order";
           document.getElementById("div"+orderId).style.display='none';
      } 
    }, (err)=>{
      console.log(err);  
    }); 

  }
   

}
