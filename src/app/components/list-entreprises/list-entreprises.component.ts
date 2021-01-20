import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  allCompanies = null;
  role: String = null;


  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private studentService: StudentService
    ) { }

    ngOnInit(): void {

      this.user = this.tokenStorageService.getUser();
      this.role = this.user.role;
      
      this.companyService.getAllCompanies().subscribe(data=>{
        this.allCompanies = data;
        console.log(this.allCompanies);
      },err=>{
      });

      if(this.user.role === "ROLE_STUDENT"){
       
      }else if(this.user.role==="ROLE_ADMIN"){
        
      }
  
  
    }

}
