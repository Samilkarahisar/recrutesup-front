import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {

  idUser;
  admin: Admin = null;

  constructor(
    private adminService: AdminService,
    private tokenStorage: TokenStorageService, 
    private notifService: NotifService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.idUser = this.tokenStorage.getUser().id;

      this.adminService.getAdmin(this.idUser).subscribe(
        admin => {
          this.admin = admin;
          this.admin.id = this.idUser;          
        },
        err => {
          this.notifService.error('Erreur', err.error.message);
        }
      )
    }
  }

  onSubmit(f: NgForm): void {
    this.adminService.updateAdmin(
      this.admin.id,
      this.admin.firstname,
      this.admin.lastname,
      this.admin.mailAddress,
      this.admin.phoneNumber
      ).subscribe(
        data => {
          this.notifService.success('Profil à jour', '');
        },
        err => {
          this.notifService.error('Erreur Mise à jour', err.error.message);
        }
    )
  }
}
