import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifService } from 'src/app/services/notif.service';
import { WishService } from 'src/app/services/wish.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Wish } from 'src/app/models/wish';
import { CompanyService } from 'src/app/services/company.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Employee } from 'src/app/models/employee';
import { Role } from 'src/app/constants/role';
import { WorkflowState } from 'src/app/constants/workflowState';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  
  form : any = {};
  wish: Wish = null;
  employees: Employee[] = null;
  role: String;
  minDate: Date;
  maxDate: Date;
  destinataire: string = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tokenStorageService: TokenStorageService,
    private wishService: WishService,
    private companyService : CompanyService,
    private offerService : OfferService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().role;
    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idWish']))) {
        const idWish = Number.parseInt(params['idWish']);
        if(this.role == 'ROLE_COMPANY') {
          this.wishService.getCompanyWish(idWish).subscribe(
            wish => {
              if(wish.state == 'VALIDE') {
                this.wish = wish;
                this.companyService.getCompany(wish.idSender).subscribe(
                  company => {
                    this.employees = company.employees;
                    this.form.student = wish.receiver;
                  }, err => {
                    this.location.back();
                  }
                )
              } else {
                this.location.back();
              }
            }, err => {
              this.location.back();
            }
          )
        } else if (this.role == 'ROLE_STUDENT') {
          this.wishService.getStudentWish(idWish).subscribe(
            wish => {
              if(wish.state == 'VALIDE') {
                this.wish = wish;
                this.form.student = wish.sender;
                this.form.offer = wish.receiver;
              } else {
                this.location.back();
              }
            }, err => {
              this.location.back();
            }
          )
        }
      } else {
        this.location.back();
      }
    });

    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear() + 1, 0, 0);
  }

  sendMeetingRequest(
    idInterlocutor1: number, 
    idInterlocutor2: number, 
    idReceiver: number): void {
      this.wishService.sendMeetingRequest(
        this.wish.id,
        this.wish.type,
        formatDate(this.form.date, 'dd/MM/yyyy', 'en-US'),
        this.form.message,
        idInterlocutor1,
        idInterlocutor2,
        idReceiver
      ).subscribe(
        response => {
          this.notifService.success('Demande de meeting envoyée','Une demande a été faite par mail');
        }, err => {
          this.notifService.error('Erreur création demande', err.error.message);
        }
      )
  }

  onSubmit(f: NgForm): void {
    if(this.form.date == null) {
      this.notifService.error('Date non renseignée', 'Veuillez rentrer une date valide');
    } else {
      if(this.role == 'ROLE_COMPANY') {
        if(this.destinataire == 'ADMIN') {
          this.sendMeetingRequest(
            this.form.employee,
            this.wish.idReceiver,
            null
          );
        } else if (this.destinataire == 'STUDENT') {
          this.sendMeetingRequest(
            this.form.employee,
            this.wish.idReceiver,
            this.wish.idReceiver
          );
        }
      } else if (this.role == 'ROLE_STUDENT') {
          this.offerService.getOffer(this.wish.idReceiver).subscribe(
            offer => {
              if(this.destinataire == 'ADMIN') {
                this.sendMeetingRequest(
                  this.wish.idSender,
                  offer.userId,
                  null
                )
              } else if(this.destinataire == 'COMPANY') {
                this.sendMeetingRequest(
                  this.wish.idSender,
                  offer.userId,
                  offer.userId
                )
              }
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          )
      }
    }
  }
}
