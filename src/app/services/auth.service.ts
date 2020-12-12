import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Login
   * @param mailAddress 
   * @param password 
   */
  login(
    mailAddress: string,
    password: string
  ): Observable<User> {
    const body = {mailAddress, password}
    return this.http.post<User>(AUTH_API + 'signin', body, httpOptions);
  }

}