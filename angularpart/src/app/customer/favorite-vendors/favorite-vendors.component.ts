import { Component, OnInit } from '@angular/core';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-favorite-vendors',
  templateUrl: './favorite-vendors.component.html',
  styleUrls: ['./favorite-vendors.component.css']
})
export class FavoriteVendorsComponent implements OnInit {
  public vendors;
  routeUrl = "http://127.0.0.1:8000/";
  constructor(private request: RequestHandlerService, private tokenService: TokenService) { }

  ngOnInit() {
    this.request.getFavoriteVendors(this.tokenService.getData().id).subscribe((res: any) => {
      this.vendors = res;  

})
  }

}
