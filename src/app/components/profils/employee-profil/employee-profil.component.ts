import { Component, OnInit } from '@angular/core';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Employee } from 'src/app/models/employee';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.css']
})
export class EmployeeProfilComponent implements OnInit {

  idUser;
  employee: Employee = null;

  constructor(
    private companyService: CompanyService,
    private tokenStorage: TokenStorageService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.idUser = this.tokenStorage.getUser().id;

      this.companyService.getEmployee(this.idUser).subscribe(
        data => {
          this.employee = data;
          this.employee.id = this.idUser;          
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
      this.employee.firstname,
      this.employee.lastname,
      this.employee.mailAddress,
      this.employee.phoneNumber,
      null
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
