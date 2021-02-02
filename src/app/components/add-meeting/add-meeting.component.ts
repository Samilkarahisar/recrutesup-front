import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifService } from 'src/app/services/notif.service';
import { WishService } from 'src/app/services/wish.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Wish } from 'src/app/models/wish';
import { CompanyService } from 'src/app/services/company.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Employee } from 'src/app/models/employee';
import { Role } from 'src/app/constants/role';
import { WorkflowState } from 'src/app/constants/workflowState';
import { OfferService } from 'src/app/services/offer.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  
  form : any = {};
  wish: Wish = null;
  user: User = null;
  role: String;

  minDate: Date;
  maxDate: Date;
  destinataire: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tokenStorageService: TokenStorageService,
    private wishService: WishService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.role = this.user.role;

    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idWish']))) {
        const idWish = Number.parseInt(params['idWish']);
        if(this.role == 'ROLE_COMPANY') {
          this.wishService.getCompanyWish(idWish).subscribe(
            wish => {
              if(wish.state == 'VALIDE') {
                this.wish = wish;
                this.form.employee = this.user.firstname + " " + this.user.lastname; // emetteur du message
                this.form.student = wish.receiver;                                   // receveur du message
              } else {
                this.location.back();
              }
            }, err => {
              this.location.back();
            }
          )
        } else {
          this.location.back();
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
    idReceiver: number
    ): void {
      var date = null;
      if(this.form.date != null) {
        date = formatDate(this.form.date, 'dd/MM/yyyy', 'en-US');
      }
      this.wishService.sendMeetingRequest(
        this.wish.id,
        this.wish.type,
        date,
        this.form.message,
        idInterlocutor1,
        idInterlocutor2,
        idReceiver
      ).subscribe(
        response => {
          this.router.navigate(['/wishes']);
        }, err => {
          this.notifService.error('Erreur demande', err.error.message);
        }
      )
  }

  onSubmit(f: NgForm): void {
    if(this.destinataire == 'ADMIN') {
      this.sendMeetingRequest(
        this.user.id,
        this.wish.idReceiver,
        null
      );
    } else if (this.destinataire == 'STUDENT') {
      this.sendMeetingRequest(
        this.user.id,
        this.wish.idReceiver,
        this.wish.idReceiver
      );
    }
  }
}
