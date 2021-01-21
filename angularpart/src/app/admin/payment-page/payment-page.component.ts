import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
 public addAmountForm;
 public addAmountSuccessMessage;
 public addAmountErrorMessage;
 public dropAmountSuccessMessage;
 public dropAmountErrorMessage;
 public dropAmountForm;
  constructor(private fb: FormBuilder, private request: RequestHandlerService) { }

  ngOnInit() {
    this.addAmountForm = this.fb.group(
      {
        user_id: ['',[Validators.required]],
        amount: ['',[Validators.required]] 
      }
     )

     this.dropAmountForm = this.fb.group(
      {
        user_id: ['',[Validators.required]],
        amount: ['',[Validators.required]] 
      }
     )
  }

  addAmount(){ 
  this.request.addAmount(this.addAmountForm.value).subscribe((res:any)=>{
    this.addAmountSuccessMessage = res.message;
    console.log(res);
  }, (err)=>{
    this.addAmountErrorMessage = err.error.message;
    console.log(this.addAmountErrorMessage);
    
    console.log(err);
  })
  }

  dropAmount(){ 
    this.request.dropAmount(this.dropAmountForm.value).subscribe((res:any)=>{
      this.dropAmountSuccessMessage = res.message;
      console.log(res);
    }, (err)=>{
      this.dropAmountErrorMessage = err.error.message; 
      console.log(err);
    })
    }

}
