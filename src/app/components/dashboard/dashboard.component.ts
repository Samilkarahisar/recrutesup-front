import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  company_states: Array<{libelle: string, number: number}> = [
    {libelle: "ENREGISTRE", number: 0},
    {libelle: "VALIDE", number: 0},
    {libelle: "INVALIDE", number: 0},
  ];
  
  student_states: Array<{libelle: string, number: number}> = [
    {libelle: "ENREGISTRE", number: 0},
    {libelle: "VALIDE", number: 0},
    {libelle: "INVALIDE", number: 0},
    {libelle: "INDISPONIBLE", number: 0},
  ];

  offer_states: Array<{libelle: string, number: number}> = [
    {libelle: "INDISPONIBLE", number: 0},
    {libelle: "BROUILLON", number: 0},
    {libelle: "EN_VALIDATION", number: 0},
    {libelle: "DISPONIBLE", number: 0},
    {libelle: "SUPPRIME", number: 0},
  ];

  wish_states: Array<{libelle: string, number: number}> = [
    {libelle: "VALIDE", number: 0},
    {libelle: "TRANSMIS", number: 0},
    {libelle: "REFUSE", number: 0},
    {libelle: "MEETING_ORGANISE", number: 0},
  ];

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private companyService: CompanyService,
              private studentService: StudentService,
              private offerService: OfferService,
              private wishService: WishService,
              private notifService: NotifService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if(this.user.role === "ROLE_ADMIN") {
      this.getCompanyStates();
      this.getStudentStates();
      this.getOfferStates();
      this.getWishStates();
    } else if(this.user.role === "ROLE_COMPANY") {

    } else if(this.user.role === "ROLE_STUDENT") {

    }
  }

  getCompanyStates(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        for(let companyDTO of data)  {
          this.company_states.find(x => x.libelle === companyDTO.state).number++;
        }
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
  }

  getStudentStates(): void {
    this.studentService.getAllStudents().subscribe(
      data => {
        for(let studentDTO of data)  {
          this.student_states.find(x => x.libelle === studentDTO.state).number++;
        }
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
  }

  getOfferStates(): void {
    this.offerService.getAllOffersLight().subscribe(
      data => {
        for(let offerDTO of data)  {
          this.offer_states.find(x => x.libelle === offerDTO.state).number++;
        }
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
  }

  getWishStates(): void {
    // TODO
  }

  getTotal(list: Array<{libelle: string, number: number}>): Number {
    var count = 0;
    list.forEach(x => {
      count = count + x.number;
    })

    return count;
  }

  getNumberFromState(list: Array<{libelle: string, number: number}>, state: string): Number {
    return list.find(x => x.libelle === state).number;
  }

}
