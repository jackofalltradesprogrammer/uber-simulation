/// <reference types="@types/googlemaps" />
import { Location } from './location';
import { Driver } from './driver';

export class Customer {
    id: number;
    driver: Driver;
    pickup: Location;
    destination: Location;
    waitingTime: number;
    zone: number;
    hasDriver: boolean = false; // trip completed or not
    marker: google.maps.Marker;


    constructor(id?: number, driver?: Driver, pickup?: Location, destination?: Location, zone?: number,
        marker?: google.maps.Marker, waitingTime?: number){
        this.id = id;
        this.driver = driver;
        this.pickup = pickup;
        this.waitingTime = waitingTime;
        this.destination = destination;
        this.zone = zone;
        this.marker = marker;
    }

    gotDriver(): void {
        this.hasDriver = true;
    }
}