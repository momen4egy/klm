import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class BookingDataService {

  //create instance of http
  constructor(private _http: Http) { }

  //get data from json file
  fetchData() {
    return this._http.get('/assets/mockdata/mock.json').map(
      response => response.json()
    );
  }

}
