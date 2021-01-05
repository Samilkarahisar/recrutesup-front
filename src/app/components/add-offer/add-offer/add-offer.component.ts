import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  form : any = {};
  user = null;
  isCreationFailed = false;
  errorMessage = '';

  constructor(private offerService: OfferService ,private tokenService: TokenStorageService, private notifService: NotifService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  onSubmit(f: NgForm): void {
    this.offerService.createOffer(
      this.form.label,
      this.form.description,
      this.form.address,
      this.form.city,
      this.form.email,
      null,
      this.user.id
    ).subscribe(
      offer => {
        f.resetForm();
        this.notifService.success('1 Offre créée', offer.label + ' a été créée');
      }, err => {
        this.notifService.error('Erreur création', err.error.message);
      }
    )
  }

}
