import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public version: string = version;

  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
  }

  getUserAndToken(): boolean {
    if(!!this.tokenStorageService.getToken() && this.tokenStorageService.isConnected()) {
      return true;
    }
    return false;
  }

}
