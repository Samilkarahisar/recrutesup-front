import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user: User = null;

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getUserAndToken();
  }

  getUserAndToken(): boolean {
    if(!!this.tokenStorageService.getToken() && this.tokenStorageService.isConnected()) {
      this.user = this.tokenStorageService.getUser();
      return true;
    }
    return false;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

}
