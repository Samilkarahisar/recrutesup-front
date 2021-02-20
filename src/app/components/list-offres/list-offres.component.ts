import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { ConfirmationIndisponibleOfferDialogComponent } from '../dialogs/confirmation-indisponible-offer-dialog/confirmation-indisponible-offer-dialog.component';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Sort } from '@angular/material/sort';
import { ConfirmationInvalidationOfferDialogComponent } from '../dialogs/confirmation-invalidation-offer-dialog/confirmation-invalidation-offer-dialog.component';
import { ConfirmationValidationOfferDialogComponent } from '../dialogs/confirmation-validation-offer-dialog/confirmation-validation-offer-dialog.component';
import { ConfirmationSuppressionOfferDialogComponent } from '../dialogs/confirmation-suppression-offer-dialog/confirmation-suppression-offer-dialog.component';

@Component({
  selector: 'app-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.css']
})
export class ListOffresComponent implements OnInit {

  role: String;
  user: User = null;
  allOffers: Offer[] = [];

  // booléen pour savoir si l'utilisateur clique sur la mat-card ou sur les boutons de mise à jour de status
  action: boolean = false;
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private notifService: NotifService,
    private offerService: OfferService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.role = this.user.role;
    
    if(this.user.role === "ROLE_COMPANY") {
      this.route.queryParams.subscribe(
        params => {
          this.offerService.getAllOffersByCompany(this.user.idCompany).subscribe(
            offers => {
              if(params['status']) {
                this.allOffers = offers.filter(offer => offer.state == params['status'] && offer.state != "SUPPRIME"); 
              } else {
                this.allOffers = offers.filter(offer => offer.state != "SUPPRIME");
              }
              this.allOffers = this.allOffers.sort(function (a, b) { return (a.state < b.state ? -1 : 1) * (true ? 1 : -1); });
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      );
    } else if (this.user.role === "ROLE_STUDENT" || this.user.role === "ROLE_ADMIN") {
      this.route.queryParams.subscribe(
        params => {
          this.offerService.getAllOffers().subscribe(
            offers => {
             if(this.user.role === "ROLE_STUDENT") {
              if(params['status']) {
                this.allOffers = offers.filter(offer => offer.state == params['status'] && offer.state === "DISPONIBLE" && offer.companyState == 'VALIDE');
              } else {
                this.allOffers = offers.filter(offer => offer.state === "DISPONIBLE" && offer.companyState == 'VALIDE');
              }
              this.allOffers = this.allOffers.sort(function (a, b) { return (a.companyName < b.companyName ? -1 : 1) * (true ? 1 : -1); });
             } else {
              if(params['status']) {
                this.allOffers = offers.filter(offer => offer.state == params['status'] && (offer.state === "DISPONIBLE" || offer.state === "INDISPONIBLE" || offer.state === "EN_VALIDATION"));
              } else {
                this.allOffers = offers.filter(offer => offer.state === "DISPONIBLE" || offer.state === "INDISPONIBLE" || offer.state === "EN_VALIDATION" );
              }
              this.allOffers = this.allOffers.sort(function (a, b) { return (a.companyName < b.companyName ? -1 : 1) * (true ? 1 : -1); });
             }
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      );
    }
  }

  wishAlreadySent(idOffre: number): boolean {
    for(let offer of this.allOffers) {
      if(offer.id == idOffre) {
        for(let wish of offer.wishReceivedList) {
          if(wish.idSender === this.tokenStorageService.getUser().id) {
            return true;
          }
        }
      }
    }

    return false;
  }

  sortData(sort: Sort) {
    const data = this.allOffers;
    if (!sort.active || sort.direction === '') {
      this.allOffers = data;
      return;
    }

    this.allOffers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.companyName, b.companyName, isAsc);
        case 'city': return this.compare(a.city, b.city, isAsc);
        case 'label': return this.compare(a.label, b.label, isAsc);
        case 'status': return this.compare(a.state, b.state, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  goToOffer(idOffer: number): void {
    if(!this.action) {
      this.router.navigate(['/offer/' + idOffer]);
    }
    this.action = false;
  }

  updateOffer(idOffer: number, newState: string): void {
    for(let offer of this.allOffers) {
      if(offer.id == idOffer) {
        offer.state = newState;
      }
    }

    this.route.queryParams.subscribe(
      params => {
        if(params['status']) {
          this.allOffers = this.allOffers.filter(offer => offer.state == params['status'] && offer.state != "SUPPRIME");
        } else {
          this.allOffers = this.allOffers.filter(offer => offer.state != "SUPPRIME");
        }
      });
  }

  validerOffer(offer: Offer): void {
    this.action = true;
    const dialogRef = this.dialog.open(ConfirmationValidationOfferDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.offerService.updateStateOffer(offer.id, offer.state, 'DISPONIBLE').subscribe(
            response => {
              this.updateOffer(response.id, response.state);
              this.notifService.success('Offre validée', 'vous avez validé une offre');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      }
    );
  }

  invaliderOffer(offer: Offer): void {
    this.action = true;
    const dialogRef = this.dialog.open(ConfirmationInvalidationOfferDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.offerService.updateStateOffer(offer.id, offer.state, 'BROUILLON').subscribe(
            response => {
              this.updateOffer(response.id, response.state);
              this.notifService.success('Offre invalidée', 'vous avez invalidé une offre');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      }
    );
  }

  indisponibleOffer(offer: Offer): void {
    this.action = true;
    const dialogRef = this.dialog.open(ConfirmationIndisponibleOfferDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.offerService.updateStateOffer(offer.id, offer.state, 'INDISPONIBLE').subscribe(
            response => {
              this.updateOffer(response.id, response.state);
              this.notifService.success('Offre indisponible', 'vous avez rendu indisponible une offre');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      }
    );
  }

  publierOffer(offer: Offer): void {
    this.action = true;
    this.offerService.updateStateOffer(offer.id, offer.state, 'EN_VALIDATION').subscribe(
      response => {
        this.updateOffer(response.id, response.state);
        this.notifService.success('Offre publiée', 'vous avez publié une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  supprimerOffer(offer: Offer): void {
    this.action = true;
    const dialogRef = this.dialog.open(ConfirmationSuppressionOfferDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.offerService.updateStateOffer(offer.id, offer.state, 'SUPPRIME').subscribe(
            response => {
              this.updateOffer(response.id, response.state);
              this.notifService.success('Offre supprimée', 'vous avez supprimé une offre');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      }
    );
  }

  statusToLabel(status: string): string {
    if(status) {
      return WorkflowState.find(x => x.variable === status).label;
    }
  }

}
