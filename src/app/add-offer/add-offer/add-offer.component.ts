import { Component, OnInit } from '@angular/core';
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

  constructor(private offerService: OfferService ,private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
  }

  onSubmit(): void {
    this.offerService.createStudent(this.form, this.user.id).subscribe(
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
