import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingDataService } from '../services/booking-data.service';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.component.html',
  providers: [BookingDataService]
})
export class FindTripComponent implements OnInit {

  retrieveBookingForm: FormGroup; //RetrieveBooking of type FormGroup
  errorMessages: object = { };

  //create instance of formbuilder
  constructor(private _formBuilder: FormBuilder, private _bookingDataService: BookingDataService) { }

  onRetrieveBooking() {
    // pass form values to retrieveBookingFormData object
    this._bookingDataService.fetchData().subscribe(
      data => {
        if (this.retrieveBookingForm.value.bookingCode.toLowerCase() === data.bookingCode.toLowerCase() && this.retrieveBookingForm.value.familyName.toLowerCase() === data.passengers.lastName.toLowerCase()) {
          // console.log(data);
          this.errorMessages['code'] = 'bookingExist';
        } else {
          // console.log('Booking does not exist, please check your booking code or family name')
          this.errorMessages['code'] = 'bookingNotExist';
        }
      }
    );
  }

  ngOnInit() {
    //retrive booking form
    this.retrieveBookingForm = this._formBuilder.group({
      bookingCode: ['', [Validators.minLength(5), Validators.maxLength(6), Validators.pattern('[2-9a-zA-Z]*')]],
      familyName: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')]]
    });
  }

}
