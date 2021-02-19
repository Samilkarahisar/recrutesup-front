import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { Wish } from 'src/app/models/wish';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  form : any = {};
  wish: Wish = null;
  user: User = null;
  role: String;

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
              if(wish.state == 'VALIDE' || wish.state == 'MEETING_ORGANISE') {
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
        } else if (this.role == 'ROLE_STUDENT') {
          this.wishService.getStudentWish(idWish).subscribe(
            wish => {
              if(wish.state == 'VALIDE' || wish.state == 'MEETING_ORGANISE') {
                this.wish = wish;
                this.form.student = wish.sender; // emetteur du message
                this.form.offer = wish.receiver; // receveur du message
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
  }

  onSubmit(f: NgForm): void {
    if(this.role == 'ROLE_COMPANY') {
      this.wishService.sendMessage(
        this.wish.id,
        'COMPANY',
        this.form.message,
        this.user.id,
        this.wish.idReceiver
      ).subscribe(
        response => {
          this.notifService.success('Message envoyé', ' message envoyé par mail');
          this.router.navigate(['/wishes']);
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    } else if (this.role == 'ROLE_STUDENT') {
      this.wishService.sendMessage(
        this.wish.id,
        'STUDENT',
        this.form.message,
        this.user.id,
        this.wish.idReceiver
        ).subscribe(
          response => {
            this.notifService.success('Message envoyé', 'message envoyé par mail');
            this.router.navigate(['/wishes']);
          }, err => {
            this.notifService.error('Erreur', err.error.message);
          }
        );
    }
  }
}
