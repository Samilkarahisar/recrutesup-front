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
    return this.http.post<Wish>(API + apiCreateStudentWish, body);
  }

  createCompanyWish(
    idCompany: number,
    idUser: number
  ): Observable<Wish> {
    const body =  {idCompany, idUser};
    return this.http.post<Wish>(API + apiCreationCompanyWish, body);
  }

  getWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(API + '/' + idWish);
  }

  getAllWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

  getAllSendedWishesByCompany(idCompany: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

  getAllReceivedWishesByCompany(idCompany: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

  getAllReceivedWishesByOffer(idOffer: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

  getAllSendedWishesByStudent(idUser: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

  getAllReceivedWishesByStudent(idUser: number): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + apiGetAllWishes);
  }

}