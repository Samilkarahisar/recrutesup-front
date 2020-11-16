import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdmin(idUser): Observable<any> {
    return this.http.get(`${API}/${idUser}`);
  }

  updateAdmin(admin): Observable<any> {
    return this.http.put(API, {
      id: admin.id,
      lastname: admin.lastname,
      firstname: admin.firstname,
      phoneNumber: admin.phoneNumber
    })
  }
}
