import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { NotifService } from 'src/app/services/notif.service';
import { StudentService } from 'src/app/services/student.service';

interface SchoolYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  form : any = {};
  years: SchoolYear[] = [
    {value: '3A', viewValue: '3A'},
    {value: '4A', viewValue: '4A'},
    {value: '5A', viewValue: '5A'}
  ];

  constructor(private userService: StudentService, private notifService: NotifService) { }

  ngOnInit(): void {
  }

  onSubmit(f :NgForm): void {
    this.userService.createStudent(
      this.form.firstname,
      this.form.lastname,
      this.form.email,
      this.form.schoolyear,
      this.form.phone,
      this.form.label,
      this.form.description
      ).subscribe(
      student => {
        f.resetForm();
        this.notifService.success('1 Etudiant créé', student.firstname + ' ' + student.lastname + ' a été créé');
      },
      err => {
        this.notifService.error('Erreur création', err.error.message);
      }
    )
  }
}
