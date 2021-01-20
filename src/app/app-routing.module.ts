import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListOffresComponent } from './components/list-offres/list-offres.component';
import { ListVoeuxComponent } from './components/list-voeux/list-voeux.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProfilComponent } from './components/profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './components/profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './components/profils/employee-profil/employee-profil.component';
import { StudentProfilComponent } from './components/profils/student-profil/student-profil.component';
import { Role } from './constants/role';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'wishes', component: ListVoeuxComponent, canActivate: [AuthGuard]},
  { path: 'offers', component: ListOffresComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'studentprofil', component: StudentProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Student]}  },
  { path: 'adminprofil', component: AdminProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]}  },
  { path: 'employeeprofil', component: EmployeeProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Company]}  },
  { path: 'companyprofil', component: CompanyProfilComponent, canActivate: [AuthGuard], data: { roles: [Role.Company]}  },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
