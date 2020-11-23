import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-company-profil',
  templateUrl: './company-profil.component.html',
  styleUrls: ['./company-profil.component.css']
})
export class CompanyProfilComponent implements OnInit {

  id;
  company = null;

  constructor(
    private companyService: CompanyService,
    private tokenStorage: TokenStorageService, 
    private notifService: NotifService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.companyService.getCompany(this.id).subscribe(
        company => {
          this.company = company;
          this.company.id = this.id;          
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

}
