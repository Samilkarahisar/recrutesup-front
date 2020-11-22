import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer';

const API = 'http://localhost:8080/offer';

const apiGetAllOffersLight: string = '/list';
const apiGetAllOffers: string = '/all';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

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
    return this.http.post<Offer>(API, body);
  }

  /**
   * Récupérer une offre
   * @param idOffer 
   */
  getOffer(idOffer: number): Observable<Offer> {
    return this.http.get<Offer>(API + '/' + idOffer);
  }

  /**
   * Récupérer toutes les offres
   */
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + apiGetAllOffers);
  }

  /**
   * Récupérer toutes les offres en objets légers
   */
  getAllOffersLight(): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + apiGetAllOffersLight);
  }

  /**
   * Récupérer toutes les offres en objets légers pour une entreprise
   * @param idCompany 
   */
  getAllOffersByCompanyLight(idCompany): Observable<Offer[]> {
    return this.http.get<Offer[]>(API + '/allByCompany/' + idCompany + '/list');
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
   */
  updateOffer(
    idOffer: number,
    label: string,
    description: string,
    address: string,
    city: string,
    mailAddress: string,
    attachmentNamesList: string[],
  ): Observable<Offer> {
    const body =  {idOffer, label, description, address, city, mailAddress, attachmentNamesList};
    return this.http.patch<Offer>(API, body);
  }

  /**
   * Supprimer une offre (mise à jour de son statut à SUPPRIME)
   * @param idOffer 
   */
  deleteOffer(idOffer: number) {
    return this.http.delete<Offer>(API + '/' + idOffer);
  }

}
