import { Location } from './location';
export class Driver {
    id: number;
    zone: number;
    location: Location;
    customer: any;
    numberOfCustomers: number;
    incomeDay: number;

    constructor(id?: number, zone?: number, location?: Location, customer?: any, ) {
        this.id = id;
        this.zone = zone;
        this.location = location;
        this.customer = customer;
        this.numberOfCustomers = 0;
        this.incomeDay = 0;

    }

    addCustomer(): void {
        this.numberOfCustomers++;
    }

    addIncome(trip: number): void {
        this.incomeDay = this.incomeDay + trip;
    }
}