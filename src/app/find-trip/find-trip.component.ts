import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.component.html'
})
export class FindTripComponent implements OnInit {

  retrieveBookingFormData = {};

  retrieveBookingForm: FormGroup; //RetrieveBooking of type FormGroup

  //create instance of formbuilder
  constructor(private _formBuilder: FormBuilder) { }

  onRetrieveBooking() {
    // pass form values to retrieveBookingFormData object
    this.retrieveBookingFormData = this.retrieveBookingForm.value;
  }

  ngOnInit() {
    //retrive booking form
    this.retrieveBookingForm = this._formBuilder.group({
        bookingCode: ['', [Validators.minLength(5), Validators.maxLength(6), Validators.pattern('[2-9a-zA-Z]*')]],
        familyName: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*') ]]
    });

  }

}
