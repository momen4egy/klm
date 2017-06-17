import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FindTripComponent } from './find-trip.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('FindTripComponent', () => {
  let component: FindTripComponent;
  let fixture: ComponentFixture<FindTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        FindTripComponent
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

  it('retrieveBookingFormData must contain the form data on submit', () => {
    component.onRetrieveBooking();
    expect(component.retrieveBookingFormData).toEqual(component.retrieveBookingForm.value);
  });
});
