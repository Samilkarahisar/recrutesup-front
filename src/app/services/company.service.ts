import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Employee } from '../models/employee';

const API = 'http://localhost:8080/company';

const apiCreateEmployee: string = '/employee';
const apiGetAllCompanies: string = '/all';
const apiGetAllEmployees: string = '/employee/all';
const apiGetEmployee: string = '/employee/';
const apiUpdateEmlpoyee: string = '/employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}


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
    return this.http.post<Company>(API, body);
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
    return this.http.post<Employee>(API + apiCreateEmployee, body);
  }

  /**
   * Récupérer toutes les entreprises
   */
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(API + apiGetAllCompanies);
  }

  /**
   * Récupérer tous les employés
   */
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API + apiGetAllEmployees);
  }

  /**
   * Récupérer une entreprise
   * @param idCompany
   */
  getCompany(idCompany: number): Observable<Company> {
    return this.http.get<Company>(API + '/' + idCompany);
  }

  /**
   * Récupérer un employé
   * @param idUser 
   */
  getEmployee(idUser: number): Observable<Employee> {
    return this.http.get<Employee>(API + apiGetEmployee + idUser);
  }

  /**
   * Mettre à jour une entreprise
   * @param mailAddress 
   * @param websiteUrl 
   * @param description 
   */
  updateCompany(
    idCompany: number,
    mailAddress: string,
    websiteUrl: string,
    description: string
  ): Observable<Company> {
    const body = {idCompany, mailAddress, websiteUrl, description};
    return this.http.patch<Company>(API, body);
  }

  /**
   * Mettre à jour un employé
   * @param phoneNumber 
   */
  updateEmployee(
    idUser: number,
    phoneNumber: string
  ): Observable<Employee> {
    const body = {idUser, phoneNumber};
    return this.http.patch<Employee>(API + apiUpdateEmlpoyee, body);
  }

}
