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
  constructor(private request: RequestHandlerService, private tokenService: TokenService) { }

  ngOnInit() {
    this.vendor_id = this.tokenService.getData().id; 
    this.request.getVendorOrders(this.vendor_id).subscribe((data)=>{ 
      this.orders = data;  
    }, (err)=>{
      console.log(err);  
    })
  }

}
