import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

const API = 'http://localhost:8080/student';

const API_IMAGE = 'https://betshare.app/api/recrutesup/upload?userid=';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  uploadProfileImage(id,file):Observable<any>{
    var formData = new FormData();
    const fileup = DataURIToBlob(file);
    var newAPI = API_IMAGE + id;
    formData.append('file', fileup, "image.png");
    return this.http.post(newAPI,formData);
  }



  /**
   * Récupérer tous les étudiants
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(API + '/all', httpOptions);
  }

  /**
   * Récupérer un étudiant
   * @param idUser 
   */
  getStudent(idUser: number): Observable<Student> {
    return this.http.get<Student>(API + '/' + idUser, httpOptions);
  }

  /**
   * Créer un étudiant
   * @param firstname
   * @param lastname 
   * @param mailAddress 
   * @param schoolYear 
   * @param phoneNumber 
   * @param label
   * @param description
   */
  createStudent(
    firstname: string,
    lastname: string,
    mailAddress: string,
    schoolYear: string,
    phoneNumber: string,
    label: string,
    description: string
  ): Observable<Student> {
    const body = {firstname, lastname, mailAddress, schoolYear, phoneNumber, label, description};
    return this.http.post<Student>(API, body, httpOptions);
  }

  /**
   * Mettre à jour un étudiant
   * @param idUser 
   * @param firstname
   * @param lastname
   * @param mailAddress
   * @param schoolYear
   * @param phoneNumber 
   * @param label 
   * @param description 
   */
  updateStudent(
    idUser: number,
    firstname: string,
    lastname: string,
    mailAddress: string,
    schoolYear: string,
    phoneNumber: string,
    label: string,
    description: string
  ): Observable<Student> {
    const body = {firstname, lastname, mailAddress, schoolYear, phoneNumber, label, description};
    return this.http.patch<Student>(API + '/' + idUser, body, httpOptions);
  }

  /**
   * Changement de mot de passe
   * @param idUser 
   * @param mailAddress 
   * @param password 
   */
  changePassword(
    idUser: number,
    mailAddress: string,
    password: string
  ): Observable<Student> {
    const body = {mailAddress, password};
    return this.http.patch<Student>(API + '/changePW/' + idUser, body, httpOptions);
  }
}
