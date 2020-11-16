import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

const API = 'http://localhost:8080/student';

const apiGetAllStudents = '/all';

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
