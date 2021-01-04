import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from 'src/app/constants/role';
import { Offer } from 'src/app/models/offer';
import { ImageService } from 'src/app/services/image.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer: Offer = null;
  role: Role = null;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private offerService: OfferService,
    private wishService: WishService,
    private imageService: ImageService,
    private notifService: NotifService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idOffer']))) {
        const idOffer = Number.parseInt(params['idOffer']);
        this.offerService.getOffer(idOffer).subscribe(
          offer => {
            this.offer = offer;
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

  sendStudenWish(): void {
    this.wishService.createStudentWish(
      this.tokenStorage.getUser().id,
      this.offer.id
    ).subscribe(
      response => {
        this.notifService.success('Voeu adressé', 'un voeu a été envoyé à ' + this.offer.companyName);
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }
}