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

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student = null;
  role: Role = null;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService,
    private wishService: WishService,
    private imageService: ImageService,
    private notifService: NotifService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().role;
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
        this.notifService.success('Voeu adressé', 'un voeu a été envoyé à ' + this.student.firstname + " " + this.student.lastname);
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }

}
