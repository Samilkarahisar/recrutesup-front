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
import { StudentProfilComponent } from './profils/student-profil/student-profil.component';
import { AdminProfilComponent } from './profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './profils/employee-profil/employee-profil.component';

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
