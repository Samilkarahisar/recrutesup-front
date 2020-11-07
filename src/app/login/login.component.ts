import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted = false;
  hide = true;
  email = new FormControl('', [Validators.required,
                               Validators.email,
                               Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Une adresse mail est requise';
    }

    return this.email.hasError('pattern') ? 'L\'adresse mail n\'est pas valide' : '';
  }

  reloadPage(): void {
    window.location.reload();
  }

}