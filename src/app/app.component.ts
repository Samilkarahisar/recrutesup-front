import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  showCompanyBoard = false;
  showStudentBoard = false;
  username: string;
  private role: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      
      this.role = user.role;
      this.showAdminBoard = this.role.includes('ADMIN');
      this.showCompanyBoard = this.role.includes('COMPANY');
      this.showStudentBoard = this.role.includes('STUDENT');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}