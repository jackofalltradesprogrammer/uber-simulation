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


  // gmapElement is a reference to <div #gmap> inside html file
  @ViewChild('gmap')
  gmapElement: any;

  map: google.maps.Map;
  // drivers: google.maps.Marker[];
  zones: Location[][];

  driversInput: number = 64;
  customers: number;
  constructor() {
    // Initialize the zones
    this.zones = [];
    for (let i = 0; i < 16; i++) {
      this.zones[i] = [];


    }

  }

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
    this.zones[0].push(new Location(234, 234))
    for (let index = 0; index < this.locsManhattan.length; index++) {
      var lat = this.locsManhattan[index]["latitude"];
      var long = this.locsManhattan[index]["longitude"];
      
      // Divide 48000 locations into 16 zones (0 - 15)

      for (let zonesIndex = 0; zonesIndex < 16; zonesIndex++) {
        for (let zone = 0; zone < this.zonesManhattan.length-1; zone++) {
          var latZoneOuter = this.zonesManhattan[zone + 1]["latitude"];
          var longZoneOuter = this.zonesManhattan[zone + 1]["longitude"];
          var latZoneInner = this.zonesManhattan[zone]["latitude"];
          // console.log("zone: " + zone + " zoneIndex: " + zonesIndex + " zone*2 " + zone*2 + " zone*2+1 " + zone*2+1);
          if ( (zonesIndex % 2 == 0) && ( (zonesIndex == zone*2) || (zonesIndex == zone*2+1) )  && lat < latZoneOuter && long <= longZoneOuter
            && lat > latZoneInner
          ) {
            this.zones[zonesIndex].push(new Location(lat, long));

          }
          if (  (zonesIndex % 2 != 0) && ( (zonesIndex == zone*2) || (zonesIndex == zone*2+1) )  && lat < latZoneOuter && long > longZoneOuter
            && lat > latZoneInner
          ) {
            this.zones[zonesIndex].push(new Location(lat, long));
          }
        }
      }// this.dispatchDrivers(lat, long);
    }



    // Randomly dispatch drivers the first run 
    var dispatchZone = 0;
    for (let driver = 0; driver < this.driversInput; driver++) {
      // var randomIndex = Math.floor(Math.random() * 48000) + 1
      // var lat = this.locsManhattan[randomIndex]["latitude"];
      // var long = this.locsManhattan[randomIndex]["longitude"];

      // randomly place drivers in 16 zones 
      // console.log(lat + "vs " + latZoneInner + "dsfdsf " +  index + "vs" + index);
     
        var randomIndex = Math.floor(Math.random() * this.zones[dispatchZone].length) + 1 
        var lat = this.zones[dispatchZone][randomIndex]["latitude"];
        var long = this.zones[dispatchZone][randomIndex]["longitude"];
         this.dispatchDriver(lat, long);
        
      console.log("Driver: " + driver + " is in Zone: "+ dispatchZone + " with lat: " + lat + " & long: "+ long);
      // drivers 
      if ( driver != 0 && ((driver+1)%(this.driversInput/16)) ==0){
        dispatchZone++;
      }
    }
    // Display the number of different geo locations in different zones
    // var sum = 0;
    // for (let zone1 = 0; zone1 < this.zones.length; zone1++) {
    //   console.log("********************       #happy" + zone1 + "      **********************" );
    //   // this.zones[zone1].forEach(loc => {
    //   //   console.log(loc["latitude"] + " " + loc["longitude"]);
    //   sum = sum + this.zones[zone1].length;
    //   // });
    //   console.log("checking the lenght of the zone : " + zone1 + " - " + this.zones[zone1].length);
      
    // }
    // display the zone boundaries
    // this.zonesManhattan.forEach(loc => {
    //     console.log(loc["latitude"] + " " + loc["longitude"]); });
    // console.log("total locations: " + sum);
  }

  dispatchDriver(lat: number, long: number): void {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var image = '../../assets/utaxi.png';  //downloaded from flaticon

    var loc: any = new google.maps.LatLng(lat, long);
    var marker = new google.maps.Marker({
      position: loc,
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
  customMap: any[] = [
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
