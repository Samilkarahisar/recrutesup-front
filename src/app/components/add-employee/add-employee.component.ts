import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  form : any = {};
  companies: Company[] = null;

  constructor(private companyService: CompanyService, private notifService: NotifService) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.companies = data
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
  }

  onSubmit(f: NgForm): void {
    this.companyService.createEmployee(
      this.form.firstname,
      this.form.lastname,
      this.form.email,
      this.form.phone,
      this.form.company
      ).subscribe(
      employee => {
        f.resetForm();
        this.notifService.success('1 Employé créé', employee.firstname + ' ' + employee.lastname + ' a été créé');
      },
      err => {
        this.notifService.error('Erreur création', err.error.message);
      }
    )
  }

}
