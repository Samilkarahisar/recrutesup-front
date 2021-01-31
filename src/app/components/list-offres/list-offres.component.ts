import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { Company } from 'src/app/models/company';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { Role } from 'src/app/constants/role';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';
import { ConfirmationIndisponibleOfferDialogComponent } from '../dialogs/confirmation-indisponible-offer-dialog/confirmation-indisponible-offer-dialog.component';
import { WorkflowState } from 'src/app/constants/workflowState';

@Component({
  selector: 'app-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.css']
})
export class ListOffresComponent implements OnInit {

  role: String;
  user: User = null;
  allOffers: Offer[] = [];

  status: string = null;

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
      this.offerService.getAllOffersByCompany(this.user.idCompany).subscribe(
        offers => {
          this.allOffers= offers.filter(offer => offer.state != "SUPPRIME");
          this.route.queryParams.subscribe(
            params => {
              if(params['status']) {
                this.allOffers = this.allOffers.filter(offer => offer.state == params['status']);
                this.status = params['status']; 
              }
            });
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if (this.user.role === "ROLE_STUDENT"){
      this.offerService.getAllOffers().subscribe(
        offers => {
            this.allOffers = offers.filter(offer => offer.state === "DISPONIBLE" && offer.companyState == 'VALIDE');
            this.route.queryParams.subscribe(
              params => {
                if(params['status']) {
                  this.allOffers = this.allOffers.filter(offer => offer.state == params['status']);
                  this.status = params['status']; 
                }
              });
        },err=>{
          this.notifService.error('Erreur', err.error.message);
      });
    } else if (this.user.role === "ROLE_ADMIN"){
      this.offerService.getAllOffers().subscribe(
        offers => {
          this.allOffers = offers.filter(offer => offer.state === "DISPONIBLE" || offer.state === "INDISPONIBLE" || offer.state === "EN_VALIDATION" );
          this.route.queryParams.subscribe(
            params => {
              if(params['status']) {
                this.allOffers = this.allOffers.filter(offer => offer.state == params['status']);
                this.status = params['status']; 
              }
            });
        }, err => {
          this.notifService.error('Erreur', err.error.message);
      });
    }
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

    this.allOffers = this.allOffers.filter(offer => offer.state == this.status);
  }

  validerOffer(offer: Offer): void {
    this.action = true;
    this.offerService.updateStateOffer(offer.id, offer.state, 'DISPONIBLE').subscribe(
      response => {
        this.updateOffer(response.id, response.state);
        this.notifService.success('Offre validée', 'vous avez validé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  invaliderOffer(offer: Offer): void {
    this.action = true;
    this.offerService.updateStateOffer(offer.id, offer.state, 'BROUILLON').subscribe(
      response => {
        this.updateOffer(response.id, response.state);
        this.notifService.success('Offre invalidée', 'vous avez invalidé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
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
    this.offerService.updateStateOffer(offer.id, offer.state, 'SUPPRIME').subscribe(
      response => {
        this.updateOffer(response.id, response.state);
        this.notifService.success('Offre supprimée', 'vous avez supprimé une offre');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  statusToLabel(status: string): string {
    if(status) {
      return WorkflowState.find(x => x.variable === status).label;
    }
  }

}
