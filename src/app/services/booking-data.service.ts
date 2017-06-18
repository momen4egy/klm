import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BookingDataService {

  constructor(private _http: Http) { }

  fetchData() {
    return this._http.get('/assets/mockdata/mock.json').map(
      response => response.json()
    );
  }

}
