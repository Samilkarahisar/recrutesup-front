import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ImageService } from 'src/app/services/image.service';
import { NotifService } from 'src/app/services/notif.service';
import { Student } from 'src/app/models/student';
import { WorkflowState } from 'src/app/constants/workflowState';

interface SchoolYear {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.css']
})
export class StudentProfilComponent implements OnInit {

  idUser;
  hide: boolean = true;
  student: Student = null;
  form: any = {};
  changePW: boolean = false;

  profilPicture = null;
  profilPictureURL = null;
  years: SchoolYear[] = [
    {value: '3A', viewValue: '3A'},
    {value: '4A', viewValue: '4A'},
    {value: '5A', viewValue: '5A'}
  ];
  file = null;

  constructor(
    private studentService: StudentService,
    private tokenStorage: TokenStorageService,
    private imageService: ImageService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.idUser = this.tokenStorage.getUser().id;

      this.studentService.getStudent(this.idUser).subscribe(
        data => {
          this.student = data;
          this.student.id = this.idUser;
          this.profilPictureURL = this.imageService.getImageById(this.idUser);
          
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

  onSubmit(): void {
    if(!this.changePW) {
      this.studentService.updateStudent(
        this.student.firstname,
        this.student.lastname,
        this.student.mailAddress,
        this.student.schoolYear,
        this.student.phoneNumber,
        this.student.label,
        this.student.description
        ).subscribe(
        response => {
          this.notifService.success('Profil à jour', 'Votre profil a été mis à jour');
        },
        err => {
          this.notifService.error('Erreur Mise à jour', err.error.message);
        }
      )
    } else {
      if(this.form.password === this.form.confirmpassword) {
        this.studentService.changePassword(
          this.student.mailAddress,
          this.form.password
        ).subscribe(
          response => {
            this.notifService.success('Profil à jour', 'Votre mot de passe a été mis à jour');
          },
          err => {
            this.notifService.error('Erreur', err.error.message);
          }
        )
      } else {
        this.notifService.error('Mot de passe incorect', 'Veuillez saisir 2 mots de passe identiques');
      }
    }
    
  }

  getLabelFromState() : string {
    return WorkflowState.find(x => x.variable === this.student.state).label;
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }

    this.loadImage(event);
  }

  loadImage(event) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.profilPicture = event.target.result;
      console.log(this.profilPicture);
      this.studentService.uploadProfileImage(this.idUser,this.profilPicture).subscribe(
        (response) =>{this.profilPictureURL = response.imageUrl, window.location.reload()},
        (error) => console.log(error)
      );
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
