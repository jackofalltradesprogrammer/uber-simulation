/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../google-maps/location';
import { LocsMANHATTAN, ZonesMANHATTAN } from '../google-maps/locations-manhattan';

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
  drivers: google.maps.Marker[];
  // Get the 50,000 addresses for manhattan & Zones
  locsManhattan = LocsMANHATTAN;
  zonesManhattan = ZonesMANHATTAN;

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
      styles: this.customMap,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    
    let index = 0;
    // Randomly Select addresses and add markers to the map
    for (let index2 = 0; index2 < 20; index2++ ) {
      var randomIndex = Math.floor(Math.random() * 48000) + 1
      var lat = this.locsManhattan[randomIndex]["latitude"];
      var long = this.locsManhattan[randomIndex]["longitude"];
      var latZoneOuter = this.zonesManhattan[index+1]["latitude"];
      var longZoneOuter = this.zonesManhattan[index+1]["longitude"];
      var latZoneInner = this.zonesManhattan[index+1]["latitude"];
      // var longZoneInner = this.zonesManhattan[index+1]["longitude"];
     
        if ( (index%2 == 0) && lat < latZoneOuter && long < longZoneOuter
          && lat > latZoneInner
        ){
          this.dispatchDrivers(lat, long);
          index2++;
          index++;
        } 
        else if ( (index%2 != 0) && lat < latZoneOuter && long > longZoneOuter
          && lat > latZoneInner
        ){
          this.dispatchDrivers(lat, long);
          index++;
          index2++;
          if(index == 10){index=0;}
            
        } 
        this.dispatchDrivers(lat, long);
    }

    
  }
  
  dispatchDrivers(lat:number, long:number): void {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var image = '../../assets/utaxi.png';  //downloaded from flaticon
      
      var loc: any = new google.maps.LatLng(lat, long );
      var marker = new google.maps.Marker({position: loc,
         map: this.map,
        //  label: labels[index % labels.length],
         icon: image, 
         //title: index + 'e'
        });
      // if (randomIndex % 2 == 0) {
      //   marker.setMap(null);
      // }
      // use to bounce the marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      // this.drivers.push(marker);

  }
  

  // Styles for  a custom map  for the simulation
  customMap:any[] = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];
  

}
