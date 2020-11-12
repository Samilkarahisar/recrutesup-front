import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/company';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  createCompany(company): Observable<any> {
    return this.http.post(API, {
      name: company.name,
      mailAddress: company.email,
      websiteUrl: company.url
    })
  }

  getAllCompanies():Observable<any> {
    return this.http.get(API + '/all');
  }

  createEmployee(employee): Observable<any> {
    return this.http.post(API + '/employee', {
      firstname: employee.firstname,
      lastname: employee.lastname,
      mailAddress: employee.email,
      phoneNumber: employee.phone,
      idCompany: employee.company
    })
  }
}
