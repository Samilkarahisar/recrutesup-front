import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { StudentService } from '../services/student.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
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
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    this.getCompanyStates();
    this.getStudentStates();
  }

  getCompanyStates(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        for(let companyDTO of data)  {
          this.company_states.find(x => x.libelle === companyDTO.state).number++;
        }
      },
      err => {

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

  getNumberFromState(list: Array<{libelle: string, number: number}>, state: String): Number {
    return list.find(x => x.libelle === state).number;
  }

}
