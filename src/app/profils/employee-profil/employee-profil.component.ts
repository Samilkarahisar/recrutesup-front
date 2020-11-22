import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.css']
})
export class EmployeeProfilComponent implements OnInit {

  id;
  employee = null;

  constructor(
    private companyService: CompanyService,
    private tokenStorage: TokenStorageService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.companyService.getEmployee(this.id).subscribe(
        data => {
          this.employee = data;
          this.employee.id = this.id;          
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

  onSubmit(): void {
    this.companyService.updateEmployee(
      this.employee.id,
      this.employee.phoneNumber
    ).subscribe(
      data => {
        this.notifService.success('Profil à jour', '');
      },
      err => {
        this.notifService.error('Erreur Mise à jour', err.error.message);
      }
    )
  }
}
