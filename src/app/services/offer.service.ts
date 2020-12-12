import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer';

const API = 'http://localhost:8080/offer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  /**
   * Récupérer une offre
   * @param idOffer 
   */
  getOffer(idOffer: number): Observable<Offer> {
    return this.http.get<Offer>(API + '/' + idOffer, httpOptions);
  }

  /**
   * Récupérer toutes les offres
   */
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + '/all', httpOptions);
  }

  /**
   * Récupérer toutes les offres par entreprise
   * @param idCompany 
   */
  getAllOffersByCompany(idCompany: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + '/all/' + idCompany, httpOptions);
  }

  /**
   * Récupérer toutes les offres en objets légers
   */
  getAllOffersLight(): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + '/light/all', httpOptions);
  }

  /**
   * Récupérer toutes les offres par entreprise, en objets légers
   * @param idCompany 
   */
  getAllOfferLightByCompany(idCompany: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + '/light/all/' + idCompany, httpOptions);
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
    return this.http.post<Offer>(API, body, httpOptions);
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
    return this.http.patch<Offer>(API + '/' + idOffer, body, httpOptions);
  }

  /**
   * Supprimer une offre (mise à jour de son statut à SUPPRIME)
   * @param idOffer 
   */
  deleteOffer(idOffer: number) {
    return this.http.delete<Offer>(API + '/' + idOffer, httpOptions);
  }

}
