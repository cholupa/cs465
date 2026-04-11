import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})

export class EditTrip implements OnInit{
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripService
  ){}

  ngOnInit(): void {
    let tripCode = localStorage.getItem("tripCode");
    if(!tripCode){
      alert("Issue with trip code");
      this.router.navigate(['']);
      return;
    }
    console.log("Edit Trip ::ngOnInit");
    console.log('tripCode: ' + tripCode);
    
    this.editForm = this.formBuilder.group({
      _id:[],
      code: ['',Validators.required],
      name: ['',Validators.required],
      length: ['',Validators.required],
      start: ['',Validators.required],
      resort: ['',Validators.required],
      perPerson: ['',Validators.required],
      image: ['',Validators.required],
      description: ['',Validators.required],
    })

    this.tripService.getTrip(tripCode).subscribe({
      next: (value:any) => {
        this.trip = value;
        this.editForm.patchValue(value[0]);
        if(!value){
          this.message = 'No Trip Received';
        }
        else{
          this.message = 'Trip: ' + tripCode + 'received';
        }
        console.log(this.message);
      },
      error: (error:any) =>{
        console.log('E: ' + error);
      }
    })
  }

  public onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (value:any) =>{
          console.log("Updated response",JSON.stringify(value));
          this.router.navigate(['']);
        },
        error: (error:any) => {
          console.log('E: ' + error);
        }
      })
    }
  }

  get f() {return this.editForm.controls;}



}
