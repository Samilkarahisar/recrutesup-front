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
  hide: boolean = true;  
  admin: Admin = null;
  form: any = {};
  changePW: boolean = false;

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

  onSubmit(): void {
    if(!this.changePW) {
      this.adminService.updateAdmin(
        this.admin.id,
        this.admin.firstname,
        this.admin.lastname,
        this.admin.mailAddress,
        this.admin.phoneNumber
        ).subscribe(
          response => {
            this.notifService.success('Profil à jour', 'Votre profil a été mis à jour');
          },
          err => {
            this.notifService.error('Erreur Mise à jour', err.error.message);
          }
      )
    } else {
      if(this.form.password === this.form.confirmpassword) {
        this.adminService.changePassword(
          this.idUser,
          this.admin.mailAddress,
          this.form.password
        ).subscribe(
          response => {
            this.notifService.success('Profil à jour', 'Votre mot de passe a été mis à jour');
          },
          err => {
            this.notifService.error('Erreur', err.error.message);
          }
        )
      } else {
        this.notifService.error('Mot de passe incorect', 'Veuillez saisir 2 mots de passe identiques');
      }
    }
  }
}
