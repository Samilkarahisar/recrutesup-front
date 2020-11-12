import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  form : any = {};
  isCreationFailed = false;
  errorMessage = '';
  companies = null;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.companies = data
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCreationFailed = true;
      }
    )
  }

  onSubmit(): void {
    this.companyService.createEmployee(this.form).subscribe(
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
