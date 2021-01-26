import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { Company } from 'src/app/models/company';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  user: User = null;
  student: Student = null;
  admin: Admin = null;
  allStudents = null;
  role: String = null;

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private studentService: StudentService) { }

  
    ngOnInit(): void {

      this.user = this.tokenStorageService.getUser();
      this.role = this.user.role;
      
      this.studentService.getAllStudents().subscribe(data=>{
        this.allStudents = data;
        console.log(this.allStudents);
      },err=>{
      });

      if(this.user.role === "ROLE_STUDENT"){
       
      }else if(this.user.role==="ROLE_ADMIN"){
        
      }
  
  
    }

}
