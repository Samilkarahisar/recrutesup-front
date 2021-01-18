import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StudentProfilComponent } from './components/profils/student-profil/student-profil.component';
import { AdminProfilComponent } from './components/profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './components/profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './components/profils/employee-profil/employee-profil.component';
import { StudentComponent } from './components/views/student/student.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { errorInterceptorProviders } from './helpers/interceptors/error.interceptor';
import { authInterceptorProviders } from './helpers/interceptors/auth.interceptor';
import { spinnerInterceptorProviders } from './helpers/interceptors/spinner.interceptor';
import { CompanyComponent } from './components/views/company/company.component';
import { OfferComponent } from './components/views/offer/offer.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { ModifyOfferComponent } from './components/modify-offer/modify-offer.component';
import { ListVoeuxComponent } from './components/list-voeux/list-voeux.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AddStudentComponent,
    AddCompanyComponent,
    AddEmployeeComponent,
    DashboardComponent,
    StudentProfilComponent,
    AdminProfilComponent,
    CompanyProfilComponent,
    EmployeeProfilComponent,
    StudentComponent,
    SpinnerOverlayComponent,
    CompanyComponent,
    OfferComponent,
    AddMeetingComponent,
    AddOfferComponent,
    ModifyOfferComponent
    ListVoeuxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    authInterceptorProviders,
    errorInterceptorProviders,
    spinnerInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
