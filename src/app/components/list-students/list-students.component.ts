import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowState } from 'src/app/constants/workflowState';
import { Admin } from 'src/app/models/admin';
import { Company } from 'src/app/models/company';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ConfirmationIndisponibleStudentDialogComponent } from '../dialogs/confirmation-indisponible-student-dialog/confirmation-indisponible-student-dialog.component';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  user: User = null;
  allStudents: Student[] = [];
  role: String = null;

  // booléen pour savoir si l'utilisateur clique sur la mat-card ou sur les boutons de mise à jour de status
  action: boolean = false;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private notifService: NotifService,
    private dialog: MatDialog,) { }

    ngOnInit(): void {
      this.user = this.tokenStorageService.getUser();
      this.role = this.user.role;
      
      this.route.queryParams.subscribe(
        params => {
          this.studentService.getAllStudents().subscribe(
            data => {
              if(params['status']) {
                this.allStudents = data.filter(student => student.state == params['status']);
              } else {
                this.allStudents = data;
              }
              this.allStudents = this.allStudents.sort(function (a, b) { return (a.firstname < b.firstname ? -1 : 1) * (true ? 1 : -1); });
            }, err => {
              this.notifService.error('Erreur', err.error.message);
            }
          );
        }
      );
    }

    wishAlreadySent(idUser: number): boolean {
      for(let student of this.allStudents) {
        if(student.id == idUser) {
          for(let wish of student.wishReceivedList) {
            if(wish.idSender === this.tokenStorageService.getUser().idCompany) {
              return true;
            }
          }
        }
      }
  
      return false;
    }

    sortData(sort: Sort) {
      const data = this.allStudents;
      if (!sort.active || sort.direction === '') {
        this.allStudents = data;
        return;
      }
  
      this.allStudents = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return this.compare(a.firstname, b.firstname, isAsc);
          case 'year': return this.compare(a.schoolYear, b.schoolYear, isAsc);
          case 'label': return this.compare(a.label, b.label, isAsc);
          case 'status': return this.compare(a.state, b.state, isAsc);
          default: return 0;
        }
      });
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    goToStudent(idStudent: number): void {
      if(!this.action) {
        this.router.navigate(['/student/' + idStudent]);
      }
      this.action = false;
    }

    updateStudent(idStudent: number, newState: string): void {
      for(let student of this.allStudents) {
        if(student.id == idStudent) {
          student.state = newState;
        }
      }

      this.route.queryParams.subscribe(
        params => {
          if(params['status']) {
            this.allStudents = this.allStudents.filter(student => student.state == params['status']);
          }
        });
    }

    validerStudent(student: Student): void {
      this.action = true;
      this.studentService.updateStateStudent(student.id, student.state, 'VALIDE').subscribe(
        response => {
          this.updateStudent(response.id, response.state);
          this.notifService.success('Etudiant validé', 'vous avez validé un étudiant');
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  
    invaliderStudent(student: Student): void {
      this.action = true;
      this.studentService.updateStateStudent(student.id, student.state, 'INVALIDE').subscribe(
        response => {
          this.updateStudent(response.id, response.state);
          this.notifService.success('Etudiant invalidé', 'vous avez invalidé un étudiant');
        }, err => {
          this.notifService.error('Erreur', err.error.message);
        }
      );
    }
  
    indisponibleStudent(student: Student): void {
      this.action = true;
      const dialogRef = this.dialog.open(ConfirmationIndisponibleStudentDialogComponent);
      dialogRef.afterClosed().subscribe(
        result => {
          if(result == true) {
            this.studentService.updateStateStudent(student.id, student.state, 'INDISPONIBLE').subscribe(
              response => {
                this.updateStudent(response.id, response.state);
                this.notifService.success('Etudiant indisponible', 'vous avez rendu indisponible un étudiant');
              }, err => {
                this.notifService.error('Erreur', err.error.message);
              }
            );
          }
        });
    }

    statusToLabel(status: string): string {
      if(status) {
        return WorkflowState.find(x => x.variable === status).label;
      }
    }
}
