import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotifService } from 'src/app/services/notif.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;  
  forgotPW: boolean = false;
  form: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private companyService: CompanyService,
    private studentService: StudentService,
    private tokenStorage: TokenStorageService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if(!this.forgotPW) {
      this.authService.login(
        this.form.email,
        this.form.password
        ).subscribe(
          user => {
            if(user.role === "ROLE_COMPANY") {
              this.tokenStorage.saveToken(user.token);
              this.companyService.getCompanyContainingEmployee(user.id).subscribe(
                company => {
                  user.idCompany = company.id;
                  user.state = company.state;
                  this.tokenStorage.saveUser(user);
                  this.notifService.success('Connecté', 'vous êtes connectés');
                  if(company.state == "INVALIDE") {
                    this.notifService.permanentWarn('Status INVALIDE', 'l\'entreprise ' + company.name + ' est invalide, elle ne peut plus interagir avec les étudiants');
                  }
                  this.router.navigate(['/dashboard']);
                }, err => {
                  this.notifService.error('Connexion échouée', '');
                }
              )
            } else if(user.role === "ROLE_STUDENT") {
              this.tokenStorage.saveToken(user.token);
              this.studentService.getStudent(user.id).subscribe(
                student => {
                  user.state = student.state;
                  this.tokenStorage.saveUser(user);
                  this.notifService.success('Connecté', 'vous êtes connectés');
                  if(student.state == "INVALIDE") {
                    this.notifService.permanentWarn('Status INVALIDE', 'vous êtes au status invalide');
                  } else if(student.state == "INDISPONIBLE") {
                    this.notifService.permanentInfo('Status INDISPONIBLE', 'vous êtes indisponible, vous ne pouvez plus interagir avec les entreprises');
                  }
                  this.router.navigate(['/dashboard']);
                }, err => {
                  this.notifService.error('Connexion échouée', '');
                }
              )
            } else {
              this.tokenStorage.saveToken(user.token);
              this.tokenStorage.saveUser(user);
              this.notifService.success('Connecté', 'vous êtes connectés');
              this.router.navigate(['/dashboard']);
            } 
          },
          err => {
            this.notifService.error('Connexion échouée', '');
          }
      );
    } else {
      this.authService.recupPassword(this.form.email).subscribe(
        response => {
          this.notifService.success('Récupération mot de passe', 'un email a été envoyé à ' + this.form.email);
        },
        err => {
          this.notifService.error('L\'adresse mail n\'est pas correct', err.error.message);
        }
      )
    }
      
  }
}