import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getAllOffersLight(): Observable<any> {
    return this.http.get(API + '/list');
  }

  getAllOffersByCompanyLight(idCompany): Observable<any> {
    return this.http.get(API + '/allByCompany/' + idCompany + '/list');
  }
}
