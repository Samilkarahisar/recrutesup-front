import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  form : any = {};

  constructor(private companyService: CompanyService, private notifService: NotifService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.companyService.createCompany(
      this.form.name,
      this.form.email,
      this.form.url
      ).subscribe(
      company => {
        f.resetForm();
        this.notifService.success('1 Entreprise créée', company.name + ' a été créée');
      },
      err => {
        this.notifService.error('Erreur création', err.error.message);
      }
    )
  }
}
