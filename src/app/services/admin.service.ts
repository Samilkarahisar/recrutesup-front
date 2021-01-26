import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

const API = 'http://localhost:8080/admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  /**
   * Récupérer un admin
   * @param idUser 
   */
  getAdmin(idUser: number): Observable<Admin> {
    return this.http.get<Admin>(`${API}/${idUser}`, httpOptions);
  }

  /**
   * Récupèrer tous les admins
   */
  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${API}/all`, httpOptions);
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
    return this.http.patch<Admin>(API, body, httpOptions);
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
    return this.http.patch<Admin>(API + '/changePW', body, httpOptions);
  }
}
