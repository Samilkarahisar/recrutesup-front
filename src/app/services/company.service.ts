import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Employee } from '../models/employee';

const API = 'http://localhost:8080/company';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}


  /**
   * Récupérer toutes les entreprises
   */
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(API + '/all', httpOptions);
  }

  /**
   * Récupérer une entreprise
   * @param idCompany
   */
  getCompany(idCompany: number): Observable<Company> {
    return this.http.get<Company>(API + '/' + idCompany, httpOptions);
  }

  /**
   * Mettre à jour une entreprise
   * @param idCompany
   * @param name
   * @param mailAddress 
   * @param websiteUrl 
   * @param description 
   */
  updateCompany(
    idCompany: number,
    name: string,
    mailAddress: string,
    websiteUrl: string,
    description: string
  ): Observable<Company> {
    const body = {name, mailAddress, websiteUrl, description};
    return this.http.patch<Company>(API + '/' + idCompany, body, httpOptions);
  }

  /**
   * Créer une entreprise
   * @param name 
   * @param mailAddress 
   * @param websiteUrl 
   */
  createCompany(
    name: string,
    mailAddress: string,
    websiteUrl: string
    ): Observable<Company> {
    const body =  {name, mailAddress, websiteUrl};
    return this.http.post<Company>(API, body, httpOptions);
  }


  // EMPLOYEE


  /**
   * Récupérer tous les employés
   */
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API + '/employee/all', httpOptions);
  }

  /**
   * Récupèrer tous les employés d'une entreprise
   * @param idCompany 
   */
  getAllEmployeesByCompany(idCompany: number) : Observable<Employee[]> {
    return this.http.get<Employee[]>(API + '/employee/all/' + idCompany, httpOptions);
  }

  /**
   * Récupérer un employé
   * @param idUser 
   */
  getEmployee(idUser: number): Observable<Employee> {
    return this.http.get<Employee>(API + '/employee/' + idUser, httpOptions);
  }

  /**
   * Mettre à jour un employé
   * @param idUser
   * @param firstname
   * @param lastname
   * @param mailAddress
   * @param phoneNumber
   * @param idCompany 
   */
  updateEmployee(
    idUser: number,
    firstname: string,
    lastname: string,
    mailAddress: string,
    phoneNumber: string,
    idCompany: number
  ): Observable<Employee> {
    const body = {firstname, lastname, mailAddress, phoneNumber, idCompany};
    return this.http.patch<Employee>(API + '/employee/' + idUser, body, httpOptions);
  }

  /**
   * Créer un employé
   * @param firstname 
   * @param lastname 
   * @param mailAddress 
   * @param phoneNumber 
   * @param idCompany 
   */
  createEmployee(
    firstname: string,
    lastname: string,
    mailAddress: string,
    phoneNumber: string,
    idCompany: number
    ): Observable<Employee> {
    const body = {firstname, lastname, mailAddress, phoneNumber, idCompany};
    return this.http.post<Employee>(API + '/employee', body, httpOptions);
  }
}
