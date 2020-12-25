import { AfterViewInit, ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit , AfterViewInit{
private locationForm;
private nameForm;
private accountForm;
private aboutForm;
private map: L.Map;

@ViewChild('map', {static: false})
private mapContainer: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
    this.locationForm = new FormGroup({
      location: new FormControl()
   });
   this.nameForm = new FormGroup({
    cafeName: new FormControl()
   });
   this.accountForm = new FormGroup({
    bankAccount: new FormControl()
   });
   this.aboutForm = new FormGroup({
    aboutCafe: new FormControl()
   });
  }
  ngAfterViewInit() {
    const myAPIKey = "fe647d3830ed4021b3f8a9dfcd31076b";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4
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
  }

}
