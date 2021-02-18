import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Wish } from '../models/wish';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WishService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les voeux (étudiants et entreprises)
   */
  getAllWishes(): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.baseUrl + '/wish/all', httpOptions);
  }

  /**
   * Récupérer un voeu étudiant
   * @param idWish 
   */
  getStudentWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(this.baseUrl + '/wish/student/' + idWish, httpOptions);
  }

  /**
   * Récupérer un voeu entreprise
   * @param idWish 
   */
  getCompanyWish(idWish: number): Observable<Wish> {
    return this.http.get<Wish>(this.baseUrl + '/wish/company/' + idWish, httpOptions);
  }

  /**
   * Créer un voeu étudiant, liant un étudiant à une offre
   * @param idUser 
   * @param idOffer 
   */
  createStudentWish(
    idOffer: number
  ): Observable<Wish> {
    return this.http.post<Wish>(this.baseUrl + '/wish/student/' + idOffer, httpOptions);
  }

  /**
   * Créer un voeu entreprise, liant une entreprise à un étudiant
   * @param idCompany 
   * @param idUser 
   */
  createCompanyWish(
    idUser: number
  ): Observable<Wish> {
    return this.http.post<Wish>(this.baseUrl + '/wish/company/' + idUser, httpOptions);
  }

  /**
   * Envoyer un message à un interlocuteur
   * @param idWish 
   * @param type 
   * @param message 
   * @param idSender 
   * @param idInterlocutor 
   * @param idReceiver 
   */
  sendMessage(
    idWish: number,
    type: string,
    message: string,
    idSender: number,
    idReceiver: number
  ): Observable<Wish> {
    const body = {idWish, type, message, idSender, idReceiver};
    return this.http.post<Wish>(this.baseUrl + '/wish/message', body, httpOptions);
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
    return this.http.post<Wish>(this.baseUrl + '/wish/meeting', body, httpOptions);
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
    return this.http.patch<Wish>(this.baseUrl + '/wish/company/' + idWish + '/' + currentState + '/' + nextState, httpOptions);
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
    return this.http.patch<Wish>(this.baseUrl + '/wish/student/' + idWish + '/' + currentState + '/' + nextState, httpOptions);
  }
}