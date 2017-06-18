import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingDataService } from './../services/booking-data.service';

@Component({
  selector: 'app-find-trip',
  templateUrl: './find-trip.component.html',
  providers: [BookingDataService]
})
export class FindTripComponent implements OnInit {

  retrieveBookingForm: FormGroup; //RetrieveBookingForm of type FormGroup
  errorMessages: object = { }; //object contain error message code

  //create instance of formbuilder and booking data service
  constructor(private _formBuilder: FormBuilder, private _bookingDataService: BookingDataService) { }

  onRetrieveBooking() {
    // get booking data from service
    this._bookingDataService.fetchData().subscribe(
      data => {
        //when bookingCode and familyName match with service data show booking exist message otherwise show an error
        if (this.retrieveBookingForm.value.bookingCode.toLowerCase() === data.bookingCode.toLowerCase() && this.retrieveBookingForm.value.familyName.toLowerCase() === data.passengers.lastName.toLowerCase()) {
          this.errorMessages['code'] = 'bookingExist';
        } else {
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
