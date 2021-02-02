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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationIndisponibleOfferDialogComponent } from '../../dialogs/confirmation-indisponible-offer-dialog/confirmation-indisponible-offer-dialog.component';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Wish } from 'src/app/models/wish';

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
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog,
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
    return this.role == 'ROLE_COMPANY' &&
           this.offer != null &&
           this.offer.companyId == this.user.idCompany &&
           this.offer.state != 'EN_VALIDATION' &&
           this.offer.state != 'INDISPONIBLE' &&
           this.offer.state != 'SUPPRIME';
  }

  validerOffer(): void {
    this.offerService.updateStateOffer(this.offer.id, this.offer.state, 'DISPONIBLE').subscribe(
      response => {
        this.offer = response;
        this.notifService.success('Offre validée', 'vous avez validé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  invaliderOffer(): void {
    this.offerService.updateStateOffer(this.offer.id, this.offer.state, 'BROUILLON').subscribe(
      response => {
        this.offer = response;
        this.notifService.success('Offre invalidée', 'vous avez invalidé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  indisponibleOffer(): void {
    const dialogRef = this.dialog.open(ConfirmationIndisponibleOfferDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.offerService.updateStateOffer(this.offer.id, this.offer.state, 'INDISPONIBLE').subscribe(
            response => {
              this.offer = response;
              this.notifService.success('Offre indisponible', 'vous avez rendu indisponible une offre');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      }
    );
  }

  publierOffer(): void {
    this.offerService.updateStateOffer(this.offer.id, this.offer.state, 'EN_VALIDATION').subscribe(
      response => {
        this.offer = response;
        this.notifService.success('Offre publiée', 'vous avez publié une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  supprimerOffer(): void {
    this.offerService.updateStateOffer(this.offer.id, this.offer.state, 'SUPPRIME').subscribe(
      response => {
        this.offer = response;
        this.notifService.success('Offre supprimée', 'vous avez supprimé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  refuserWish(idWish: number, type: string): void {
    if(type == "COMPANY") {
      this.wishService.updateStateCompanyWish(idWish, "TRANSMIS", "REFUSE").subscribe(
        response => {
          this.notifService.success('Voeu refusé', 'vous avez refusé un voeu');
          this.updateWish(this.offer.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if(type == "STUDENT") {
      this.wishService.updateStateStudentWish(idWish, "TRANSMIS", "REFUSE").subscribe(
        response => {
          this.notifService.success('Voeu refusé', 'vous avez refusé un voeu');
          this.updateWish(this.offer.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  }

  validerWish(idWish: number, type: string): void {
    if(type == "COMPANY") {
      this.wishService.updateStateCompanyWish(idWish, "TRANSMIS", "VALIDE").subscribe(
        response => {
          this.notifService.success('Voeu validé', 'vous avez validé un voeu');
          this.updateWish(this.offer.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if(type == "STUDENT") {
      this.wishService.updateStateStudentWish(idWish, "TRANSMIS", "VALIDE").subscribe(
        response => {
          this.notifService.success('Voeu validé', 'vous avez validé un voeu');
          this.updateWish(this.offer.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  }

  updateWish(list: Wish[], idWish: number, newState: string): void {
    for(let wish of list) {
      if(wish.id == idWish) {
        wish.state = newState;
      }
    }
  }

  statusToLabel(status: string): string {
    return WorkflowState.find(x => x.variable === status).label;
  }
}
