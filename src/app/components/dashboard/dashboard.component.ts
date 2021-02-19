import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/constants/role';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { OfferService } from 'src/app/services/offer.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { WishService } from 'src/app/services/wish.service';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = null;
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
  ];

  wish_states: Array<{libelle: string, number: number}> = [
    {libelle: "VALIDE", number: 0},
    {libelle: "TRANSMIS", number: 0},
    {libelle: "REFUSE", number: 0},
    {libelle: "MEETING_ORGANISE", number: 0},
  ];

  // booléen pour savoir si l'admin clique sur la mat-card ou sur les boutons de'envoi de mails
  action: boolean = false;

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
              private adminService: AdminService,
              private companyService: CompanyService,
              private studentService: StudentService,
              private offerService: OfferService,
              private wishService: WishService,
              private notifService: NotifService,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    if(this.user.role === "ROLE_ADMIN") {
      this.getAllCompanyStates();
      this.getAllStudentStates();
      this.getAllOfferStates();
      this.getAllWishStates();
    } else if(this.user.role === "ROLE_COMPANY") {
      this.companyService.getCompany(this.user.idCompany).subscribe(
        company => {
          if(company.offers) {
            for(let offer of company.offers.filter(offer => offer.state != 'SUPPRIME'))  {
              this.offer_states.find(x => x.libelle === offer.state).number++;
            }
          }
          if(company.wishSendList != null) {
            for(let wish of company.wishSendList) {
              this.wish_states.find(x => x.libelle === wish.state).number++;
            }
          }
        }, err => {
          this.notifService.permanentError('Erreur', err.error.message);
        }
      )
    } else if(this.user.role === "ROLE_STUDENT") {
      this.studentService.getStudent(this.user.id).subscribe(
        student => {
          if(student.wishSendList != null) {
            for(let wish of student.wishSendList) {
              this.wish_states.find(x => x.libelle === wish.state).number++;
            }
          }
        }, err => {
          this.notifService.permanentError('Erreur', err.error.message);
        }
      )
    }
  }

  getAllCompanyStates(): void {
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

  getAllStudentStates(): void {
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

  getAllOfferStates(): void {
    this.offerService.getAllOffersLight().subscribe(
      data => {
        for(let offerDTO of data)  {
          if(offerDTO.state != "BROUILLON" && offerDTO.state != "SUPPRIME") {
            this.offer_states.find(x => x.libelle === offerDTO.state).number++;
          }
        }
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
  }

  getAllWishStates(): void {
    this.wishService.getAllWishes().subscribe(
      data => {
        for(let wishDTO of data) {
          this.wish_states.find(x => x.libelle === wishDTO.state).number++;
        }
      },
      err => {
        this.notifService.permanentError('Erreur', err.error.message);
      }
    )
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

  goTo(route: string, params: Array<{status: string}>): void {
    if(!this.action) {
      this.router.navigate([route], { queryParams: params });
    }
    this.action = false;
  }

  sendMessage(role: string, state: string, destinataires: string): void {
    this.action = true;
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '900px',
      height: '550px',
      data: {destinataires: destinataires}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.adminService.sendMessage(role, state, result).subscribe(
          response => {
            this.notifService.success('Message envoyé', 'message envoyé par mail');
          }, err => {
            this.notifService.error('Erreur', err.error.message);
          }
        )
      }
    });
  }
  
}
