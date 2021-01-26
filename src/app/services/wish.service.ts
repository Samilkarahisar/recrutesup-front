import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wish } from '../models/wish';

const API = 'http://localhost:8080/wish';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les voeux (étudiants et entreprises)
   */
  getAllWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(API + '/all', httpOptions);
  }

  /**
   * Récupérer un voeu étudiant
   * @param idWish 
   */
  getStudentWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(API + '/student/' + idWish, httpOptions);
  }

  /**
   * Récupérer un voeu entreprise
   * @param idWish 
   */
  getCompanyWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(API + '/company/' + idWish, httpOptions);
  }

  /**
   * Créer un voeu étudiant, liant un étudiant à une offre
   * @param idUser 
   * @param idOffer 
   */
  createStudentWish(
    idOffer: number
  ): Observable<Wish> {
    return this.http.post<Wish>(API + '/student/' + idOffer, httpOptions);
  }

  /**
   * Créer un voeu entreprise, liant une entreprise à un étudiant
   * @param idCompany 
   * @param idUser 
   */
  createCompanyWish(
    idUser: number
  ): Observable<Wish> {
    return this.http.post<Wish>(API + '/company/' + idUser, httpOptions);
  }

  /**
   * Envoyer une demande de création de meeting entre 2 interlocuteurs
   * @param dateMeeting 
   * @param message 
   * @param idEmetter 
   * @param idInterlocutor
   * @param idReceiver 
   */
  sendMeetingRequest(
    idWish: number,
    type: string,
    dateMeeting: string,
    message: string,
    idSender: number,
    idInterlocutor: number,
    idReceiver: number
  ): Observable<Wish> {
    const body = {idWish, type, dateMeeting, message, idSender, idInterlocutor, idReceiver};
    return this.http.post<Wish>(API + "/meeting", body, httpOptions);
  }

  /**
   * Mettre à jour le voeu entreprise
   * @param idWish 
   * @param currentState 
   * @param nextState 
   */
  updateStateCompanyWish(
    idWish: number,
    currentState: string,
    nextState: string
  ): Observable<Wish> {
    return this.http.patch<Wish>(API + '/company/' + idWish + '/' + currentState + '/' + nextState, httpOptions);
  }

  /**
   * Mettre à jour le voeu étudiant
   * @param idWish 
   * @param currentState 
   * @param nextState 
   */
  updateStateStudentWish(
    idWish: number,
    currentState: string,
    nextState: string
  ): Observable<Wish> {
    return this.http.patch<Wish>(API + '/student/' + idWish + '/' + currentState + '/' + nextState, httpOptions);
  }
}