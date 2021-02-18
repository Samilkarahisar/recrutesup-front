import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  
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
    return this.http.post<User>(this.baseUrl + '/auth/signin', body, httpOptions);
  }

  /**
   * Récupération mot de passe
   * @param mailAddress 
   */
  recupPassword(mailAddress): Observable<Object> {
    return this.http.post<Object>(this.baseUrl + '/auth/forgottenPW/' + mailAddress, httpOptions);
  }

}