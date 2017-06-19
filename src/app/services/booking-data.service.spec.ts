import { TestBed, inject, fakeAsync  } from '@angular/core/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { BookingDataService } from './booking-data.service';

describe('BookingDataService', () => {
  let backend: MockBackend;
  let bookingService: BookingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BookingDataService,
        { provide: XHRBackend, useClass: MockBackend } // inject an instance of MockBackend whenever someone asks for an XHRBackend
       ]
    });
  });

  it('should be created', inject([BookingDataService], (service: BookingDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should get booking data', inject([BookingDataService, XHRBackend], (bookingDataService, backend) => {
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
        "lastName": "HESPpppppppppp",
        "title": {
          "code": "MR",
          "name": "Mr"
        }
      }
    }

    // When the request subscribes for results on a connection, return a fake response
    backend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    bookingDataService.fetchData().subscribe((res) => {
      expect(res).toBeDefined();
    });

  }));

});
