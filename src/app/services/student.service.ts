import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8080/student';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  createStudent(student): Observable<any> {
    return this.http.post(API, {
      firstname: student.firstname,
      lastname: student.lastname,
      mailAddress: student.email,
      phoneNumber: student.phone,
      schoolYear: student.schoolyear
    })
  }

  getAllStudents():Observable<any> {
    return this.http.get(API + '/all');
  }
}
