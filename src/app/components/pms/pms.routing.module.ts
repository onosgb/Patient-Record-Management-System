import { StaffComponent } from './staff/staff.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MedicalreportComponent } from './medicalreport/medicalreport.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
{path: 'medicalreport', component: MedicalreportComponent},
{path: 'patients', component: PatientsComponent},
{path: 'staff', component: StaffComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule {}
