import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListVoeuxComponent } from './components/list-voeux/list-voeux.component';
import { LoginComponent } from './components/login/login.component';
import { ModifyOfferComponent } from './components/modify-offer/modify-offer.component';
import { AdminProfilComponent } from './components/profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './components/profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './components/profils/employee-profil/employee-profil.component';
import { StudentProfilComponent } from './components/profils/student-profil/student-profil.component';
import { CompanyComponent } from './components/views/company/company.component';
import { OfferComponent } from './components/views/offer/offer.component';
import { StudentComponent } from './components/views/student/student.component';
import { Role } from './constants/role';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'wishes', component: ListVoeuxComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-offer', component: AddOfferComponent, canActivate: [AuthGuard], data: { roles: [Role.Company]} },
  { path: 'studentprofil', component: StudentProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Student]}  },
  { path: 'adminprofil', component: AdminProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]}  },
  { path: 'employeeprofil', component: EmployeeProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Company]}  },
  { path: 'companyprofil', component: CompanyProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Company]}  },
  { path: 'student/:idUser', component: StudentComponent, canActivate: [AuthGuard], data: { roles: [Role.Student, Role.Admin, Role.Company] }  },
  { path: 'company/:idCompany', component: CompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Student, Role.Admin, Role.Company] }  },
  { path: 'offer/:idOffer', component: OfferComponent, canActivate: [AuthGuard], data: { roles: [Role.Student, Role.Admin, Role.Company] }  },
  { path: 'offer/edit/:idOffer', component: ModifyOfferComponent, canActivate: [AuthGuard], data: { roles: [Role.Company] }  },
  { path: 'wish/:idWish', component: AddMeetingComponent, canActivate: [AuthGuard], data: { roles: [Role.Student, Role.Company] }  },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
