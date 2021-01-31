import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Role } from 'src/app/constants/role';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { ImageService } from 'src/app/services/image.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company: Company = null;
  role: Role = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private companyService: CompanyService,
    private imageService: ImageService,
    private notifService: NotifService,
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
}
