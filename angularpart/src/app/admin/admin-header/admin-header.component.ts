import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  w3_open() {
    document.getElementById("sidebarofcafereg").style.display = "block";
  }
   w3_close() {
    document.getElementById("sidebarofcafereg").style.display = "none";
  }

}
