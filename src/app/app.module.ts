import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { errorInterceptorProviders } from './helpers/error.interceptor';
import { StudentProfilComponent } from './components/profils/student-profil/student-profil.component';
import { AdminProfilComponent } from './components/profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './components/profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './components/profils/employee-profil/employee-profil.component';
import { ListVoeuxComponent } from './components/list-voeux/list-voeux.component';
import { ListOffresComponent } from './components/list-offres/list-offres.component';
import { ListEntreprisesComponent } from './components/list-entreprises/list-entreprises.component';


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
    ListVoeuxComponent,
    ListOffresComponent,
    ListEntreprisesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [authInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
