import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  id;
  student = null;
  profilPicture = null;
  errorMessage = '';
  years: SchoolYear[] = [
    {value: '3A', viewValue: '3A'},
    {value: '4A', viewValue: '4A'},
    {value: '5A', viewValue: '5A'}
  ];
  file = null;

  constructor(private studentService: StudentService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.studentService.getStudent(this.id).subscribe(
        data => {
          this.student = data;
          this.student.id = this.id;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }
  }

  onSubmit(): void {
    this.studentService.updateStudent(this.student).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
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
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
