import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

const API = 'http://localhost:8080/student';

const apiGetAllStudents = '/all';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  /**
   * Créer une entreprise
   * @param firstname
   * @param lastname 
   * @param mailAddress 
   * @param phoneNumber 
   * @param schoolYear 
   */
  createStudent(
    firstname: string,
    lastname: string,
    mailAddress: string,
    phoneNumber: string,
    schoolYear: string
  ): Observable<Student> {
    const body = {firstname, lastname, mailAddress, phoneNumber, schoolYear};
    return this.http.post<Student>(API, body);
  }

  /**
   * Récupérer un étudiant
   * @param idStudent 
   */
  getStudent(idStudent: number): Observable<Student> {
    return this.http.get<Student>(API + '/' + idStudent);
  }

  /**
   * Récupérer tous les étudiants
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(API + apiGetAllStudents);
  }

  /**
   * Mettre à jour un étudiant
   * @param idUser 
   * @param phoneNumber 
   * @param label 
   * @param description 
   */
  updateStudent(
    idUser: number,
    phoneNumber: string,
    label: string,
    description: string
  ): Observable<Student> {
    const body = {idUser, phoneNumber, label, description};
    return this.http.patch<Student>(API, body);
  }
}
