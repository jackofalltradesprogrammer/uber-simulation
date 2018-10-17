/// <reference types="@types/googlemaps" />
import { Location } from './location';
import { Customer } from './Customer';
export class Driver {
    id: number;
    zone: number;
    location: Location;
    customer: Customer;
    numberOfCustomers: number;
    incomeDay: number;
    marker : google.maps.Marker;
    idle: boolean;

    constructor(id?: number, zone?: number, location?: Location, customer?: any, marker?: google.maps.Marker ) {
        this.id = id;
        this.zone = zone;
        this.location = location;
        this.customer = customer;
        this.numberOfCustomers = 0;
        this.incomeDay = 0;
        this.marker = marker;
        this.idle = false;

    }

    addCustomer(): void {
        this.numberOfCustomers++;
    }

    addIncome(trip: number): void {
        this.incomeDay = this.incomeDay + trip;
    }

    setCustomer(customer: Customer): void{
        this.customer = customer;
    }

    toggleIdle(): void {
        this.idle = !this.idle;
    }
}