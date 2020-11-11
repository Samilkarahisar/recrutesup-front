import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

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
  isCreationFailed = false;
  errorMessage = '';
  years: SchoolYear[] = [
    {value: '3A', viewValue: '3A'},
    {value: '4A', viewValue: '4A'},
    {value: '5A', viewValue: '5A'}
  ];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.studentService.createStudent(this.form).subscribe(
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
