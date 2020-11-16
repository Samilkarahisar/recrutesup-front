import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-employee-profil',
  templateUrl: './employee-profil.component.html',
  styleUrls: ['./employee-profil.component.css']
})
export class EmployeeProfilComponent implements OnInit {

  id;
  employee = null;
  errorMessage = '';

  constructor(private companyService: CompanyService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.companyService.getEmployee(this.id).subscribe(
        data => {
          this.employee = data;
          this.employee.id = this.id;          
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }
  }

  onSubmit(): void {
    this.companyService.updateEmployee(this.employee).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}
