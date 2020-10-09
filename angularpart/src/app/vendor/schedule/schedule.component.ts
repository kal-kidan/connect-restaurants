import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private fb: FormBuilder,private requestHandler:RequestHandlerService) { }
   private statusForm;
   private scheduleForm;
   private user;
   private vendor_id;
   public schedules;
   public status;
  ngOnInit() {

    this.scheduleForm = this.fb.group(
      {
        timespan:['', [Validators.required]],
      }
    );

    this.statusForm = this.fb.group(
      {
        status:['', [Validators.required]],
      }
    );

    this.requestHandler.getUser().
      subscribe((data) => {
        this.user = data;
        this.vendor_id = this.user.id;
      },
        (error) => {
          console.log("error fetching user in schedule route", error);
        });

        this.getSchedules();
  }

  addDeliveryTime(list){
    this.scheduleForm.value.vendor_id=this.vendor_id;
      this.requestHandler.addSchedule( this.scheduleForm.value).subscribe(
            (data)=>{
              this.hideList(list);
              this.getSchedules();

            },
            (error)=>{
              console.log("error adding schedule", error)
            }
      )
  }
  getSchedules(){
    this.requestHandler.getSchedule().subscribe(
      (data)=>{
        this.schedules=data;

      },
      (error)=>{
        console.log("error adding schedule", error)
      }
)
  }

  getStatus(){
    this.requestHandler.getStatus().subscribe(
      (data)=>{
        console.log("updated user", data);
      },
      (error)=>{
        console.log("error updating status", error);
      }
    )
  }
  updateStatus(){
    this.requestHandler.updateVendorStatus(this.statusForm.value.status).subscribe(
      (data)=>{
        console.log("updated user", data);
      },
      (error)=>{
        console.log("error updating status", error);
      }
    )
  }

  deleteSchedule(scheduleId, list){
    this.requestHandler.deleteSchedule(scheduleId).subscribe(
     (data)=>{
      this.hideList(list);
      this.getSchedules();
     },
     (error)=>{
       console.log("error occured deleting schedule",error)
     }
    )
  }

  hideList(list) {
    for (let i = 0; i < list.children.length; i++) {
      let li = list.children[i];
      li.hidden = true;
    }
  }

}


