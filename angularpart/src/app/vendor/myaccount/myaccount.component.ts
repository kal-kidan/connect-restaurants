import { AfterViewInit, ViewChild, ElementRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { TokenService } from 'src/app/services/token.service';
import { VistorService } from 'src/app/services/vistor.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit , AfterViewInit{
private locationForm;
private nameForm;
private phoneForm;
private aboutForm;
public addressSuccessMessage='';
public phoneSuccessMessage='';
public aboutSuccessMessage='';
public nameSuccessMessage='';
public locationSuccessMessage='';
private map: L.Map;
public modalRef: BsModalRef;
@ViewChild('map', {static: false})
private mapContainer: ElementRef<HTMLElement>;
public latitude;
public longitude;
public id;
  constructor(private visitorService: VistorService, private request: RequestHandlerService, private tokenService: TokenService, private modalService: BsModalService) { }

  ngOnInit() {
    this.id = this.tokenService.getData().id;
    this.locationForm = new FormGroup({
      location: new FormControl('', {
        validators: Validators.required 
     })
   });
   this.nameForm = new FormGroup({
    cafeName: new FormControl('', {
      validators: Validators.required 
   })
   });
   this.phoneForm = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: Validators.required 
   })
   });
   this.aboutForm = new FormGroup({
    aboutCafe: new FormControl('', {
      validators: Validators.required 
   })
   });
 
  }
  ngAfterViewInit() {
    const myAPIKey = "fe647d3830ed4021b3f8a9dfcd31076b";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{ 
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.setItem("latitude", this.latitude);
        localStorage.setItem("longitude", this.longitude);
        const initialState = { 
          lng: this.longitude,
          lat: this.latitude,
          zoom: 12
        };
    
        const map = new L.Map(this.mapContainer.nativeElement).setView(
          [initialState.lat, initialState.lng],
          initialState.zoom
        );
      
        // the attribution is required for the Geoapify Free tariff plan
        map.attributionControl
          .setPrefix("")
          .addAttribution(
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
          );
    
        L.mapboxGL({
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          accessToken: "pk.eyJ1Ijoia2Fsa2lkYW50IiwiYSI6ImNrajQ4ZGZhNTJqNHcydG54ZHk0aWw5enEifQ.Ay5QkbatF1jMzgMlMOSIZA"
        }).addTo(map);
        
        let marker = L.marker([initialState.lat, initialState.lng],{title: `you are on ${this.latitude}, ${this.longitude}`, draggable: true}).
        addTo(map).
        on('dragend', function() {
          var coord = String(marker.getLatLng()).split(','); 
          this.latitude = coord[0].split('(')[1];
          this.longitude = coord[1].split(')')[0]; 
          localStorage.setItem("latitude", this.latitude);
          localStorage.setItem("longitude", this.longitude);
          marker.bindPopup("Moved to: " + this.latitude + ", " + this.longitude + "."); 
        });
        var popup = marker.bindPopup('<b>Hello !</b><br />do you want to change your location? please move the marker and click update location.');
        popup.openPopup();
      
      });
    }
}

updateLocation(template){ 
  let loc:any; 
  this.visitorService.getGEOLocation(localStorage.getItem("latitude"), localStorage.getItem("longitude")).subscribe((res:any)=>{
    loc = res.features[0].properties; 
    this.request.addLocaton(res.features[0].properties).subscribe((res:any)=>{ 
      this.locationSuccessMessage = res.message + " to " + loc.formatted;
      return this.openModal(template);
    })
    
  })
}

public openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template); // {3}
}

updateData(name){
  let data;
  if(name == "address"){
    data = {name, value: this.locationForm.get('location').value}
  }
  if(name == "cafename"){
    data = {name, value: this.nameForm.get('cafeName').value}
  }
  if(name == "phonenumber"){
    data = {name, value: this.phoneForm.get('phoneNumber').value}
  }
  if(name == "aboutus"){
    data = {name, value: this.aboutForm.get('aboutCafe').value}
  } 
  this.request.updateUserData(this.id, data).subscribe((res:any)=>{
    if(name == "address"){
      this.addressSuccessMessage = res.message;
    }
    if(name == "cafename"){
      this.nameSuccessMessage = res.message;
    }
    if(name == "phonenumber"){
      this.phoneSuccessMessage = res.message;
    }
    if(name == "aboutus"){
      this.aboutSuccessMessage = res.message;
    }   
  }, (err)=>{
    console.log(err); 
  })
}
}
