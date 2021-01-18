import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Offer } from 'src/app/models/offer';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/user';
import { OfferService } from 'src/app/services/offer.service';
import { NotifService } from 'src/app/services/notif.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modify-offer',
  templateUrl: './modify-offer.component.html',
  styleUrls: ['./modify-offer.component.css']
})
export class ModifyOfferComponent implements OnInit {

  offer: Offer = null;
  user: User = null;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tokenStorage: TokenStorageService,
    private offerService: OfferService,
    private notifService: NotifService,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser(); 
    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idOffer']))) {
        const idOffer = Number.parseInt(params['idOffer']);
        this.offerService.getOffer(idOffer).subscribe(
          offer => {
            this.offer = offer;
            if(this.offer.companyId != this.user.idCompany) {
              this.location.back();
            }
          },
          err => {
            this.location.back();
          }
        )
      } else {
        this.location.back();
      }
    });
  }

  onSubmit(f: NgForm): void {
    this.offerService.updateOffer(
      this.offer.id,
      this.offer.label,
      this.offer.description,
      this.offer.address,
      this.offer.city,
      this.offer.mailAddress,
      null,
      this.offer.userId
      ).subscribe(
      response => {
        this.notifService.success('Offre mise à jour', 'Votre offre a été mise à jour');
      },
      err => {
        this.notifService.error('Erreur Miodification', err.error.message);
      }
    )
  }

}
