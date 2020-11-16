import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';

import { LoginComponent } from './login/login.component';
import { Role } from './models/Role';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'add-student', component: AddStudentComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'add-company', component: AddCompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
