import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer';

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
export class OfferService {

  baseUrl: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  /**
   * Récupérer une offre
   * @param idOffer 
   */
  getOffer(idOffer: number): Observable<Offer> {
    return this.http.get<Offer>(this.baseUrl + '/offer/' + idOffer, httpOptions);
  }

  /**
   * Récupérer toutes les offres
   */
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + '/offer/all/', httpOptions);
  }

  /**
   * Récupérer toutes les offres par entreprise
   * @param idCompany 
   */
  getAllOffersByCompany(idCompany: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + '/offer/all/' + idCompany, httpOptions);
  }

  /**
   * Récupérer toutes les offres en objets légers
   */
  getAllOffersLight(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + '/offer/light/all', httpOptions);
  }

  /**
   * Récupérer toutes les offres par entreprise, en objets légers
   * @param idCompany 
   */
  getAllOfferLightByCompany(idCompany: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + '/offer/light/all/' + idCompany, httpOptions);
  }

  /**
   * Créer une offre
   * @param label 
   * @param description 
   * @param address 
   * @param city 
   * @param mailAddress 
   * @param attachmentNamesList 
   * @param userId 
   */
  createOffer(
    label: string,
    description: string,
    address: string,
    city: string,
    mailAddress: string,
    attachmentNamesList: string[],
    userId: number
  ): Observable<Offer> {
    const body =  {label, description, address, city, mailAddress, attachmentNamesList, userId};
    return this.http.post<Offer>(this.baseUrl + '/offer/', body, httpOptions);
  }

  /**
   * Mettre à jour une offre
   * @param idOffer 
   * @param label 
   * @param description 
   * @param address 
   * @param city 
   * @param mailAddress 
   * @param attachmentNamesList 
   * @param userId
   */
  updateOffer(
    idOffer: number,
    label: string,
    description: string,
    address: string,
    city: string,
    mailAddress: string,
    attachmentNamesList: string[],
    userId: number
  ): Observable<Offer> {
    const body =  {label, description, address, city, mailAddress, attachmentNamesList, userId};
    return this.http.patch<Offer>(this.baseUrl + '/offer/' + idOffer, body, httpOptions);
  }

  /**
   * Mettre à jour le statut d'une offre
   * @param idOffer 
   * @param currentState 
   * @param nextState 
   */
  updateStateOffer(
    idOffer: number,
    currentState: string,
    nextState: string
  ): Observable<Offer> {
    return this.http.patch<Offer>(this.baseUrl + '/offer/' + idOffer + '/' + currentState + '/' + nextState, httpOptions);
  }

  /**
   * Supprimer une offre (mise à jour de son statut à SUPPRIME)
   * @param idOffer 
   */
  deleteOffer(idOffer: number) {
    return this.http.delete<Offer>(this.baseUrl + '/offer/' + idOffer, httpOptions);
  }

}
