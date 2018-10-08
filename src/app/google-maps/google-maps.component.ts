/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../google-maps/location';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  constructor() { }
  // gmapElement is a reference to <div #gmap> inside html file
  @ViewChild('gmap')
  gmapElement: any;
 
  map: google.maps.Map;

  // center the map to this lat and long
  manhattan: Location = {
    latitude: 40.7831,
    longitude: -73.9712
  };
  centerMap: any = new google.maps.LatLng(this.manhattan.latitude, this.manhattan.longitude);
    
  ngOnInit() {

     // Define map properties
     var mapProp = {
      center: this.centerMap,
      zoom: 15,
      // styles: this.customMap,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  }
  
  

}
