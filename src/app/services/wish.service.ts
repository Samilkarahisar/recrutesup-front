import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wish } from '../models/wish';

const API = 'http://localhost:8080/wish';

const apiCreateStudentWish = '/student';
const apiCreationCompanyWish = '/company';
const apiGetAllWishes = '/all';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  createStudentWish(
    idUser: number,
    idOffer: number
  ): Observable<Wish> {
    const body =  {idUser, idOffer};
    return this.http.post<Wish>(API + apiCreateStudentWish, body, httpOptions);
  }

  createCompanyWish(
    idCompany: number,
    idUser: number
  ): Observable<Wish> {
    const body =  {idCompany, idUser};
    return this.http.post<Wish>(API + apiCreationCompanyWish, body, httpOptions);
  }

  getWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(API + '/' + idWish, httpOptions);
  }

  getAllWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

  getAllSendedWishesByCompany(idCompany: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

  getAllReceivedWishesByCompany(idCompany: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

  getAllReceivedWishesByOffer(idOffer: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

  getAllSendedWishesByStudent(idUser: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

  getAllReceivedWishesByStudent(idUser: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes, httpOptions);
  }

}