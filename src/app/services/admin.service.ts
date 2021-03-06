import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = environment.baseUrl;
  adminEndPoint: string = '/admin/';

  constructor(private http: HttpClient) { }

  /**
   * Récupérer un admin
   * @param idUser 
   */
  getAdmin(idUser: number): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl + this.adminEndPoint + idUser, httpOptions);
  }

  /**
   * Récupèrer tous les admins
   */
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl + this.adminEndPoint + 'all', httpOptions);
  }

  /**
   * Mettre à jour un admin
   * @param idUser 
   * @param firstname 
   * @param lastname 
   * @param mailAddress
   * @param phoneNumber 
   */
  updateAdmin(
    firstname: string,
    lastname: string,
    mailAddress: string,
    phoneNumber: string
  ): Observable<Admin> {
    const body = {firstname, lastname, mailAddress, phoneNumber};
    return this.http.patch<Admin>(this.baseUrl + this.adminEndPoint, body, httpOptions);
  }

  /**
   * Changement de mot de passe
   * @param idUser 
   * @param mailAddress 
   * @param password 
   */
  changePassword(
    mailAddress: string,
    password: string
  ): Observable<Admin> {
    const body = {mailAddress, password};
    return this.http.patch<Admin>(this.baseUrl + this.adminEndPoint + 'changePW', body, httpOptions);
  }

  sendMessage(
    role: string,
    state: string,
    message: string
  ): Observable<Admin> {
    const body = {role, state, message};
    return this.http.post<Admin>(this.baseUrl + this.adminEndPoint + 'message', body, httpOptions);
  }
}
