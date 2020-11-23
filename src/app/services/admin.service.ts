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
    return this.http.get<Admin>(`${API}/${idUser}`);
  }

  /**
   * Mettre à jour un admin
   * @param id 
   * @param lastname 
   * @param firstname 
   * @param phoneNumber 
   */
  updateAdmin(
    id: number,
    lastname: string,
    firstname: string,
    phoneNumber: string
  ): Observable<Admin> {
    const body = {id, lastname, firstname, phoneNumber};
    return this.http.patch<Admin>(API, body);
  }
}
