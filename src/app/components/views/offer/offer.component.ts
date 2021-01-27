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
import { Employee } from 'src/app/models/employee';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer: Offer = null;
  role: Role = null;
  user: User = null;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private offerService: OfferService,
    private wishService: WishService,
    private notifService: NotifService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser(); 
    this.role = this.user.role;
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
      this.offer.id
    ).subscribe(
      response => {
        this.notifService.success('Voeu adressé', 'un voeu a été envoyé à ' + this.offer.companyName);
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }

  wishAlreadySent(): boolean {
    for(let wish of this.offer.wishReceivedList) {
      if(wish.idSender === this.tokenStorage.getUser().id) {
        return true;
      }
    }

    return false;
  }

  canModify(): boolean {
    return this.role == 'ROLE_COMPANY' && this.offer != null && this.offer.companyId == this.user.idCompany;
  }
}
