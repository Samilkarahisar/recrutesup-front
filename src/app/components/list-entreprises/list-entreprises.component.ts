import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkflowState } from 'src/app/constants/workflowState';
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
@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.css']
})
export class ListEntreprisesComponent implements OnInit {

  user: User = null;
  student: Student = null;
  admin: Admin = null;
  allCompanies: Company[] = [];
  role: String = null;

  status: string = null;

  // booléen pour savoir si l'utilisateur clique sur la mat-card ou sur les boutons de mise à jour de status
  action: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private notifService: NotifService,
    ) { }

    ngOnInit(): void {
      this.user = this.tokenStorageService.getUser();
      this.role = this.user.role;

      this.route.queryParams.subscribe(
        params => {
          this.companyService.getAllCompanies().subscribe(
            data => {
              if(params['status']) {
                this.allCompanies = data.filter(company => company.state == params['status']);
                this.status = params['status']; 
              } else {
                this.allCompanies = data;
              }
          }, err => {
              this.notifService.error('Erreur', err.error.message);
          });
        }
      );
    }

    goToCompany(idCompany: number): void {
      if(!this.action) {
        this.router.navigate(['/company/' + idCompany]);
      }
      this.action = false;
    }

    updateCompany(idCompany: number, newState: string): void {
      for(let company of this.allCompanies) {
        if(company.id == idCompany) {
          company.state = newState;
        }
      }

      this.allCompanies = this.allCompanies.filter(company => company.state == this.status);
    }

    invaliderCompany(company: Company): void {
      this.action = true;
      this.companyService.updateStateCompany(company.id, company.state, 'INVALIDE').subscribe(
        response => {
          this.updateCompany(response.id, response.state);
          this.notifService.success('Entreprise invalidée', 'vous avez invalidé une entreprise');
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  
    validerCompany(company: Company): void {
      this.action = true;
      this.companyService.updateStateCompany(company.id, company.state, 'VALIDE').subscribe(
        response => {
          this.updateCompany(response.id, response.state);
          this.notifService.success('Entreprise validée', 'vous avez validé une entreprise');
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
