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
  hide: boolean = true;
  employee: Employee = null;
  form: any = {}
  changePW: boolean = false;

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
    if(!this.changePW) {
      this.companyService.updateEmployee(
        this.employee.firstname,
        this.employee.lastname,
        this.employee.mailAddress,
        this.employee.phoneNumber,
        null
      ).subscribe(
        response => {
          this.notifService.success('Profil à jour', 'Votre profil a été mis à jour');
        },
        err => {
          this.notifService.error('Erreur Mise à jour', err.error.message);
        }
      )
    } else {
      if(this.form.password === this.form.confirmpassword) {
        this.companyService.changePassword(
          this.employee.mailAddress,
          this.form.password
        ).subscribe(
          response => {
            this.notifService.success('Profil à jour', 'Votre mot de passe a été mis à jour');
          },
          err => {
            this.notifService.error('Erreur', err.error.message);
          }
        )
      } else {
        this.notifService.error('Mot de passe incorect', 'Veuillez saisir 2 mots de passe identiques');
      }
    }
    
  }
}
