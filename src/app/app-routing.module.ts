import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProfilComponent } from './profils/admin-profil/admin-profil.component';
import { CompanyProfilComponent } from './profils/company-profil/company-profil.component';
import { EmployeeProfilComponent } from './profils/employee-profil/employee-profil.component';
import { StudentProfilComponent } from './profils/student-profil/student-profil.component';
import { Role } from './constants/role';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'studentprofil', component: StudentProfilComponent },
  { path: 'adminprofil', component: AdminProfilComponent },
  { path: 'employeeprofil', component: EmployeeProfilComponent },
  { path: 'companyprofil', component: CompanyProfilComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
