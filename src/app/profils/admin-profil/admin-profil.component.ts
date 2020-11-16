import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {

  id;
  admin = null;
  errorMessage = '';

  constructor(private adminService: AdminService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.adminService.getAdmin(this.id).subscribe(
        data => {
          this.admin = data;
          this.admin.id = this.id;          
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    }
  }

  onSubmit(): void {
    this.adminService.updateAdmin(this.admin).subscribe(
      data => {
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}
