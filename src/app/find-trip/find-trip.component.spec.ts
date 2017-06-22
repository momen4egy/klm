import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FindTripComponent } from './find-trip.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend } from '@angular/http/testing';
import { BookingDataService } from './../services/booking-data.service';

describe('FindTripComponent', () => {
  let component: FindTripComponent;
  let fixture: ComponentFixture<FindTripComponent>;

  const mockResponse = {
    "bookingCode": "PZIGZ3",
    "contactDetails": [
      {
        "@class": "EmailAddress",
        "address": "TRAINER@YAHOO.FR"
      }
    ],
    "itinerary": {
      "type": "ONE_WAY",
      "connections": [
        {
          "id": 1,
          "duration": "120",
          "origin": {
            "IATACode": "AMS",
            "name": "Schiphol",
            "city": {
              "IATACode": "AMS",
              "name": "Amsterdam",
              "country": {
                "code": "NL",
                "name": "The Netherlands"
              }
            }
          },
          "destination": {
            "IATACode": "NCE",
            "name": "Cote D'Azur Airport",
            "city": {
              "IATACode": "NCE",
              "name": "Nice",
              "country": {
                "code": "FR",
                "name": "France"
              }
            }
          },
          "segments": [
            {
              "id": 2,
              "type": "LOCAL",
              "informational": false,
              "departFrom": {
                "IATACode": "AMS",
                "name": "Schiphol",
                "city": {
                  "IATACode": "AMS",
                  "name": "Amsterdam",
                  "country": {
                    "code": "NL",
                    "name": "The Netherlands"
                  }
                }
              },
              "arriveOn": {
                "IATACode": "NCE",
                "name": "Cote D'Azur Airport",
                "city": {
                  "IATACode": "NCE",
                  "name": "Nice",
                  "country": {
                    "code": "FR",
                    "name": "France"
                  }
                }
              },
              "marketingFlight": {
                "number": "1263",
                "carrier": {
                  "code": "KL",
                  "name": "KLM"
                },
                "status": {
                  "code": "CONFIRMED",
                  "name": "Confirmed"
                },
                "numberOfStops": 0,
                "sellingClass": {
                  "code": "Z"
                },
                "operatingFlight": {
                  "number": "1263",
                  "carrier": {
                    "code": "KL",
                    "name": "KLM"
                  },
                  "duration": "PT2H",
                  "flown": false,
                  "checkInStart": "2016-10-13T03:35+02:00",
                  "localCheckInStart": "2016-10-13T03:35",
                  "checkInEnd": "2016-10-14T08:35+02:00",
                  "localCheckInEnd": "2016-10-14T08:35",
                  "scheduledArrival": "2016-10-14T11:35+02:00",
                  "localScheduledArrival": "2016-10-14T11:35",
                  "scheduledDeparture": "2016-10-14T09:35+02:00",
                  "localScheduledDeparture": "2016-10-14T09:35",
                  "arrivalTerminal": {
                    "name": "2"
                  },
                  "cabin": {
                    "code": "10",
                    "name": "Business"
                  },
                  "equipment": {
                    "code": "73H",
                    "name": "Boeing 737-800"
                  }
                }
              }
            }]
        }]
    },
    "passengers": {
      "id": 1,
      "firstName": "Momen",
      "lastName": "HESPMock",
      "title": {
        "code": "MR",
        "name": "Mr"
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpModule],
      declarations: [FindTripComponent],
      providers: [
        BookingDataService,
        { provide: XHRBackend, useClass: MockBackend } // inject an instance of MockBackend whenever someone asks for an XHRBackend
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('onRetrieveBooking', () => {

    beforeEach(inject([XHRBackend], (backend) => {
      // When the request subscribes for results on a connection, return a fake response
      backend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

    }));

    it('should set errorMessages code to bookingExist when booking code and family name user input is exist', () => {

      const userInput = {
        bookingCode: 'PZIGZ3',
        familyName: 'HESPMock'
      };

      component.retrieveBookingForm.controls['bookingCode'].setValue(userInput.bookingCode);
      component.retrieveBookingForm.controls['familyName'].setValue(userInput.familyName);

      component.onRetrieveBooking();
      expect(component.errorMessages['code']).toBe('bookingExist');

    });

    it('should set errorMessages code to bookingNotExist when booking code and family name user input is NOT exist', () => {

      const userInput = {
        bookingCode: 'UV57Z3',
        familyName: 'Test'
      };

      component.retrieveBookingForm.controls['bookingCode'].setValue(userInput.bookingCode);
      component.retrieveBookingForm.controls['familyName'].setValue(userInput.familyName);

      component.onRetrieveBooking();
      expect(component.errorMessages['code']).toBe('bookingNotExist');

    });

  });

});
