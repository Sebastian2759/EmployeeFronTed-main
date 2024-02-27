import { Routes } from '@angular/router';
import { EmployeeGeneralComponent } from './Employee/employee-general/employee-general.component';
import { EmployeeDetailComponent } from './Employee/employee-detail/employee-detail.component';
import { HomeComponent } from './Employee/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'EmployeeGeneral', component: EmployeeGeneralComponent },
  { path: 'EmployeeDetailt', component: EmployeeDetailComponent },

];
