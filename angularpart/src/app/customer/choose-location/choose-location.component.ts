import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Router } from '@angular/router';
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
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.css']
})
export class ChooseLocationComponent implements OnInit {
  private map: L.Map;

  @ViewChild('map', {static: false})
  private mapContainer: ElementRef<HTMLElement>;
  public latitude;
  public longitude;

  constructor(private route:Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const myAPIKey = "fe647d3830ed4021b3f8a9dfcd31076b";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{ 
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.setItem("moved-latitude", this.latitude);
        localStorage.setItem("moved-longitude", this.longitude);
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
          localStorage.setItem("moved-latitude", this.latitude);
          localStorage.setItem("moved-longitude", this.longitude);
          marker.bindPopup("Moved to: " + this.latitude + ", " + this.longitude + "."); 
        });
        var popup = marker.bindPopup('<b>Hello !</b><br />please choose your location and click on select a delivery location.');
        popup.openPopup();
      
      });
    }
}

updateLocation(){  
 let choosedLatitude = localStorage.getItem("moved-latitude");
 let choosedLongitude = localStorage.getItem("moved-longitude");
 localStorage.setItem("order-latitude", choosedLatitude);
 localStorage.setItem("order-longitude", choosedLongitude);
 this.route.navigate(['/cart']);
}

}
