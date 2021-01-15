import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   public vendors;
   public noSearchResult = false;
   public routeUrl = "http://127.0.0.1:8000/";
  constructor(private request: RequestHandlerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.request.search(this.route.snapshot.params.q).subscribe((res:any)=>{
      this.vendors = res;
      if(res.length == 0){
        this.noSearchResult = true;
      }
      console.log(res);
    }, (err)=>{
      console.log(err);
      
    })
  }

}
