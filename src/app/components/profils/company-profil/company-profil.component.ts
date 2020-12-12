import { Component, OnInit } from '@angular/core';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-company-profil',
  templateUrl: './company-profil.component.html',
  styleUrls: ['./company-profil.component.css']
})
export class CompanyProfilComponent implements OnInit {

  idUser;
  company: Company = null;

  constructor(
    private companyService: CompanyService,
    private tokenStorage: TokenStorageService, 
    private notifService: NotifService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.idUser = this.tokenStorage.getUser().id;
      this.companyService.getEmployee(this.idUser).subscribe(
        employee => {
          this.companyService.getCompany(employee.idCompany).subscribe(
            company => {
              this.company = company;
            },
            err => {
              this.notifService.error('Erreur', err.error.message);
            }
          )       
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

  onSubmit(): void {
    this.companyService.updateCompany(
      this.company.id,
      this.company.name,
      this.company.mailAddress,
      this.company.websiteUrl,
      this.company.description
      ).subscribe(
      data => {
        this.notifService.success('Profil à jour', '');
      },
      err => {
        this.notifService.error('Erreur Mise à jour', err.error.message);
      }
    )
  }

  getLabelFromState() : string {
    return WorkflowState.find(x => x.variable === this.company.state).label;
  }

}
