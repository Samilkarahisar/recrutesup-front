import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(
    mailAddress: string,
    password: string
  ): Observable<any> {
    const body = {mailAddress, password}
    return this.http.post(AUTH_API + 'signin', body, httpOptions);
  }

}