import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

const notifBody = {
  timeOut: 5000,
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true,
  maxLength: 40
};

const permNotifBody = {
  showProgressBar: true,
  pauseOnHover: true,
  clickToClose: true,
  maxLength: 40
};

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private notifService: NotificationsService) { }

  /**
   * MESSAGES TEMPORAIRES
   */

  success(titre: string, message: string): void {
    const toast = this.notifService.success(titre, message, notifBody);
  }

  error(titre: string, message: string): void {
    const toast = this.notifService.error(titre, message, notifBody);
  }

  alert(titre: string, message: string): void {
    const toast = this.notifService.alert(titre, message, notifBody);
  }

  warn(titre: string, message: string): void {
    const toast = this.notifService.warn(titre, message, notifBody);
  }

  info(titre: string, message: string): void {
    const toast = this.notifService.info(titre, message, notifBody);
  }


  /**
   * MESSAGES PERMANENTS
   */

  permanentSuccess(titre: string, message: string): void {
    const toast = this.notifService.success(titre, message, permNotifBody);
  }

  permanentError(titre: string, message: string): void {
    const toast = this.notifService.error(titre, message, permNotifBody);
  }

  permanentAlert(titre: string, message: string): void {
    const toast = this.notifService.alert(titre, message, permNotifBody);
  }

  permanentWarn(titre: string, message: string): void {
    const toast = this.notifService.warn(titre, message, permNotifBody);
  }

  permanentInfo(titre: string, message: string): void {
    const toast = this.notifService.info(titre, message, permNotifBody);
  }
  
}
