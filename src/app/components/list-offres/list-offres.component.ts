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

import { Role } from 'src/app/constants/role';

@Component({
  selector: 'app-list-offres',
  templateUrl: './list-offres.component.html',
  styleUrls: ['./list-offres.component.css']
})
export class ListOffresComponent implements OnInit {

  user: User = null;
  student: Student = null;
  company: Company = null;
  admin: Admin = null;
  role: String;
  allOffers = null;

  
 
  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,
    private companyService: CompanyService,
    private studentService: StudentService,
    private adminService: AdminService,
    private notifService: NotifService,
    private offerService: OfferService
    ) { }

  ngOnInit(): void {

    this.user = this.tokenStorageService.getUser();

    this.role = this.user.role;
    if(this.user.role === "ROLE_COMPANY") {
      this.companyService.getCompany(this.user.idCompany).subscribe(
        data => {
          this.company = data;
          this.company.id = this.user.id;
          this.allOffers= this.company.offers;
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }else if(this.user.role === "ROLE_STUDENT"){
    
      this.offerService.getAllOffers().subscribe(data=>{
        this.allOffers = data.filter(offer => offer.state ==="DISPONIBLE");
        console.log(this.allOffers);
      },err=>{
      });
    }else if(this.user.role==="ROLE_ADMIN"){
      this.offerService.getAllOffers().subscribe(data=>{
        this.allOffers= data.filter(function(item) {
          for (var key in data) {
            if (item[key] === "DISPONIBLE" || item[key] === "INDISPONIBLE" || item[key] === "EN VALIDATION" )
              return false;
          }
          return true;
        });
        console.log(this.allOffers);
      },err=>{
      });
    }


  }
  invalidateOffer(i): void {

  }

  validateOffer(i): void {

  }
  makeIndisponibleOffer(i):void {

  }

  publishOffer(offer): void{

  }
  deleteOffer(i): void{
   // this.offerService.deleteOffer
    console.log("You asked to delete offer no:"+ i);
    this.offerService.deleteOffer(i).subscribe(
      response => {
        this.notifService.success("Suppression","L'offre a bien été supprimé");
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }

}
