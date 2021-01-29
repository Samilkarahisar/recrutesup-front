import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { NotifService } from 'src/app/services/notif.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  admins : Admin[] = null;

  constructor(
    private adminService: AdminService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe(
      data => {
        this.admins = data;
      }, err => {
        this.notifService.error('Erreur', err.error.message);
      }
    )
  }

}
