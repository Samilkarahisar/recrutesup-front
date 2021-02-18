import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student';

const API_IMAGE = 'https://betshare.app/api/upload?userid=';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
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

  baseUrl: string = environment.baseUrl;
  
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
    return this.http.get<Student[]>(this.baseUrl + '/student/all', httpOptions);
  }

  /**
   * Récupérer un étudiant
   * @param idUser 
   */
  getStudent(idUser: number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + '/student/' + idUser, httpOptions);
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
    return this.http.post<Student>(this.baseUrl + '/student/', body, httpOptions);
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
    firstname: string,
    lastname: string,
    mailAddress: string,
    schoolYear: string,
    phoneNumber: string,
    label: string,
    description: string
  ): Observable<Student> {
    const body = {firstname, lastname, mailAddress, schoolYear, phoneNumber, label, description};
    return this.http.patch<Student>(this.baseUrl + '/student/', body, httpOptions);
  }

  /**
   * Mettre à jour le statut d'un étudiant
   * @param idUser 
   * @param currentState 
   * @param nextState 
   */
  updateStateStudent(
    idUser: number,
    currentState: string,
    nextState: string
  ): Observable<Student> {
    return this.http.patch<Student>(this.baseUrl + '/student/' + idUser + '/' + currentState + '/' + nextState, httpOptions);
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
  ): Observable<Student> {
    const body = {mailAddress, password};
    return this.http.patch<Student>(this.baseUrl + '/student/changePW', body, httpOptions);
  }
}
