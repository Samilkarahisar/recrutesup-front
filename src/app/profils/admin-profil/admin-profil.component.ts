import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {

  id;
  admin = null;

  constructor(
    private adminService: AdminService,
    private tokenStorage: TokenStorageService, 
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getUser().id;

      this.adminService.getAdmin(this.id).subscribe(
        admin => {
          this.admin = admin;
          this.admin.id = this.id;          
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

  onSubmit(): void {
    this.adminService.updateAdmin(this.admin).subscribe(
      data => {
        this.notifService.success('Profil à jour', '');
      },
      err => {
        this.notifService.error('Erreur Mise à jour', err.error.message);
      }
    )
  }
}
