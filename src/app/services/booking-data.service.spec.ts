import { TestBed, inject } from '@angular/core/testing';
import { BookingDataService } from './booking-data.service';
import { HttpModule } from '@angular/http';

describe('BookingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [BookingDataService]
    });
  });

  it('should be created', inject([BookingDataService], (service: BookingDataService) => {
    expect(service).toBeTruthy();
  }));
});
