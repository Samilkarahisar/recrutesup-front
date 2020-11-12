import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddStudentComponent } from './add-student/add-student.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
