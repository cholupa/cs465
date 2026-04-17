import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { trips } from '../data/trips';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip-data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripService],
})
export class TripListingComponent implements OnInit{
  
  trips: any[] = trips;
  message = "";

  constructor(
    private tripService: TripService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    console.log(Date.now());
    this.tripService.getTrips().subscribe({
      next: (value:any) => {
        this.trips = value;
        this.cd.detectChanges();
        if(value.length > 0){
          this.message = 'There are ' + value.length + 'trips from the database';
        }
        else{
          this.message = "There are no trips from the database";
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error' + error);
      }

    })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
