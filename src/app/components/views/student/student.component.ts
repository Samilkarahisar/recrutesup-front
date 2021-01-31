import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Location } from '@angular/common';
import { NotifService } from 'src/app/services/notif.service';
import { Student } from 'src/app/models/student';
import { Role } from 'src/app/constants/role';
import { WishService } from 'src/app/services/wish.service';
import { Wish } from 'src/app/models/wish';
import { ConfirmationIndisponibleStudentDialogComponent } from '../../dialogs/confirmation-indisponible-student-dialog/confirmation-indisponible-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student = null;
  role: Role = null;
  user: User = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService,
    private wishService: WishService,
    private imageService: ImageService,
    private notifService: NotifService,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser(); 
    this.role = this.user.role;
    this.route.params.subscribe(params => {
      if(!isNaN(Number.parseInt(params['idUser']))) {
        const idUser = Number.parseInt(params['idUser']);
        this.studentService.getStudent(idUser).subscribe(
          student => {
            this.student = student;
          },
          err => {
            this.location.back();
          }
        )
      } else {
        this.location.back();
      }
    });
  }

  sendCompanyWish(): void {
    this.wishService.createCompanyWish(
      this.student.id
    ).subscribe(
      response => {
        this.student.wishReceivedList.push(response);
        this.notifService.success('Voeu adressé', 'un voeu a été envoyé à ' + this.student.firstname + " " + this.student.lastname);
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }

  wishAlreadySent(): boolean {
    for(let wish of this.student.wishReceivedList) {
      if(wish.idSender === this.tokenStorage.getUser().idCompany) {
        return true;
      }
    }

    return false;
  }

  validerStudent(): void {
    this.studentService.updateStateStudent(this.student.id, this.student.state, 'VALIDE').subscribe(
      response => {
        this.student = response;
        this.notifService.success('Etudiant validé', 'vous avez validé un étudiant');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  invaliderStudent(): void {
    this.studentService.updateStateStudent(this.student.id, this.student.state, 'INVALIDE').subscribe(
      response => {
        this.student = response;
        this.notifService.success('Etudiant invalidé', 'vous avez invalidé un étudiant');
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    );
  }

  indisponibleStudent(): void {
    const dialogRef = this.dialog.open(ConfirmationIndisponibleStudentDialogComponent);
    dialogRef.afterClosed().subscribe(
      result => {
        if(result == true) {
          this.studentService.updateStateStudent(this.student.id, this.student.state, 'INDISPONIBLE').subscribe(
            response => {
              this.student = response;
              this.notifService.success('Etudiant indisponible', 'vous avez rendu indisponible un étudiant');
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      });
  }

}
