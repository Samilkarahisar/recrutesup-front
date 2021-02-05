import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from 'src/app/constants/role';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ImageService } from 'src/app/services/image.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';
import { Offer } from 'src/app/models/offer';
import { Sort } from '@angular/material/sort';
import { WorkflowState } from 'src/app/constants/workflowState';
import { OfferService } from 'src/app/services/offer.service';
import { ConfirmationIndisponibleOfferDialogComponent } from '../../dialogs/confirmation-indisponible-offer-dialog/confirmation-indisponible-offer-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company: Company = null;
  offers: Offer[] = [];
  role: Role = null;

  // booléen pour savoir si l'utilisateur clique sur la mat-card ou sur les boutons de mise à jour de status
  action: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private companyService: CompanyService,
    private offerService: OfferService,
    private imageService: ImageService,
    private notifService: NotifService,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idCompany']))) {
        const idCompany = Number.parseInt(params['idCompany']);
        this.companyService.getCompany(idCompany).subscribe(
          company => {
            this.company = company;
            this.offers = this.company.offers.filter(offer => offer.state != "SUPPRIME" );
            this.offers = this.offers.sort(function (a, b) { return (a.city < b.city ? -1 : 1) * (true ? 1 : -1); });
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

  sortData(sort: Sort) {
    const data = this.offers;
    if (!sort.active || sort.direction === '') {
      this.offers = data;
      return;
    }

    this.offers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
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

  invaliderCompany(): void {
    this.companyService.updateStateCompany(this.company.id, this.company.state, 'INVALIDE').subscribe(
      response => {
        this.company = response;
        this.notifService.success('Entreprise invalidée', 'vous avez invalidé une entreprise');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  validerCompany(): void {
    this.companyService.updateStateCompany(this.company.id, this.company.state, 'VALIDE').subscribe(
      response => {
        this.company = response;
        this.notifService.success('Entreprise validée', 'vous avez validé une entreprise');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  goToOffer(idOffer: number): void {
    if(!this.action) {
      this.router.navigate(['/offer/' + idOffer]);
    }
    this.action = false;
  }

  updateOffer(idOffer: number, newState: string): void {
    for(let offer of this.offers) {
      if(offer.id == idOffer) {
        offer.state = newState;
      }
    }
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

  statusToLabel(status: string): string {
    return WorkflowState.find(x => x.variable === status).label;
  }

  wishAlreadySent(idOffre: number): boolean {
    for(let offer of this.offers) {
      if(offer.id == idOffre) {
        for(let wish of offer.wishReceivedList) {
          if(wish.idSender === this.tokenStorage.getUser().id) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
