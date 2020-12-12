import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;  
  form: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
      this.authService.login(
        this.form.email,
        this.form.password
        ).subscribe(
        user => {
          this.tokenStorage.saveToken(user.token);
          this.tokenStorage.saveUser(user);
          this.notifService.success('Connecté', 'vous êtes connectés');
          this.router.navigate(['/']);
        },
        err => {
          this.notifService.error('Connexion échouée', err.error.message);
        }
      );
  }

  reloadPage(): void {
    window.location.reload();
  }

}