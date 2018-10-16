import { Location } from './location';
import { Driver } from './driver';

export class Customer {
    id: number;
    driver: Driver;
    pickup: Location;
    destination: Location;
    waitingTime: number;
    trip: boolean = false; // trip completed or not

    constructor(id?: number, driver?: Driver, pickup?: Location, destination?: Location, waitingTime?: number){
        this.id = id;
        this.driver = driver;
        this.pickup = pickup;
        this.waitingTime = waitingTime;
        this.destination = destination;
    }

    completeTrip(): void {
        this.trip = true;
    }
}