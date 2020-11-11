import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  form : any = {};
  isCreationFailed = false;
  errorMessage = '';

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.companyService.createCompany(this.form).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;        
        this.isCreationFailed = true;
      }
    )
  }
}
