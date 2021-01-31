import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Company } from 'src/app/models/company';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { Wish } from 'src/app/models/wish';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-list-voeux',
  templateUrl: './list-voeux.component.html',
  styleUrls: ['./list-voeux.component.css']
})
export class ListVoeuxComponent implements OnInit {

  user: User = null;
  student: Student = null;
  company: Company = null;
  wishReceivedList: Wish[] = [];
  wishSendList: Wish[] = [];
  
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private studentService: StudentService,
    private wishService: WishService,
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

          this.offerService.getAllOffersByCompany(this.company.id).subscribe(data=>{
            var arr = [];
            data.forEach(offer => {
              offer.wishReceivedList.forEach(wish=>{
                arr.push(wish);
              });
              
            });
            this.wishReceivedList=arr;
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
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
   
  }

  refuserWish(idWish: number, type: string): void {
    if(type == "COMPANY") {
      this.wishService.updateStateCompanyWish(idWish, "TRANSMIS", "REFUSE").subscribe(
        response => {
          this.notifService.success('Voeu refusé', 'vous avez refusé un voeu');
          this.updateWish(this.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if(type == "STUDENT") {
      this.wishService.updateStateStudentWish(idWish, "TRANSMIS", "REFUSE").subscribe(
        response => {
          this.notifService.success('Voeu refusé', 'vous avez refusé un voeu');
          this.updateWish(this.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  }

  validerWish(idWish: number, type: string): void {
    if(type == "COMPANY") {
      this.wishService.updateStateCompanyWish(idWish, "TRANSMIS", "VALIDE").subscribe(
        response => {
          this.notifService.success('Voeu validé', 'vous avez validé un voeu');
          this.updateWish(this.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if(type == "STUDENT") {
      this.wishService.updateStateStudentWish(idWish, "TRANSMIS", "VALIDE").subscribe(
        response => {
          this.notifService.success('Voeu validé', 'vous avez validé un voeu');
          this.updateWish(this.wishReceivedList, response.id, response.state);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  }

  updateWish(list: Wish[], idWish: number, newState: string): void {
    for(let wish of list) {
      if(wish.id == idWish) {
        wish.state = newState;
      }
    }
  }

  statusToLabel(status: string): string {
    return WorkflowState.find(x => x.variable === status).label;
  }

}
