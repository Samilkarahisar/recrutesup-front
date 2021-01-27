import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list-voeux',
  templateUrl: './list-voeux.component.html',
  styleUrls: ['./list-voeux.component.css']
})
export class ListVoeuxComponent implements OnInit {

  user: User = null;
  student: Student = null;
  company: Company = null;

  wishReceivedList = [];
  wishSendList = null;
  
  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private studentService: StudentService,
    private notifService: NotifService,
    private offerService: OfferService
    ) { }


  ngOnInit(): void {

    this.user = this.tokenStorageService.getUser();
    if(this.user.role === "ROLE_COMPANY") {
      this.companyService.getCompany(this.user.idCompany).subscribe(
        data => {
          this.company = data;
          var offers = this.company.offers;
          console.log(this.company.id);

          this.offerService.getAllOffersByCompany(this.company.id).subscribe(data=>{
            console.log(data);
            var arr = [];
            data.forEach(offer => {
              console.log(offer);
              offer.wishReceivedList.forEach(wish=>{
                arr.push(wish);
              });
              
            });
            this.wishReceivedList=arr;
            console.log(arr);
            console.log(this.wishReceivedList);
          },err => {
            this.notifService.error('Erreur', err.error.message);
          });

          this.wishSendList= this.company.wishSendList;
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );

    }else if(this.user.role === "ROLE_STUDENT"){
      this.studentService.getStudent(this.user.id).subscribe(
        data => {
          this.student = data;
          this.student.id = this.user.id;
          this.wishReceivedList= this.student.wishReceivedList;
          this.wishSendList= this.student.wishSendList;
          console.log(this.student);
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
   
  }

}
