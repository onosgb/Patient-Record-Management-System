import { PmsRoutingModule } from './pms.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MedicalreportComponent } from './medicalreport/medicalreport.component';
import { PatientsComponent } from './patients/patients.component';
import { StaffComponent } from './staff/staff.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
@NgModule({
  declarations: [MedicalreportComponent, PatientsComponent, StaffComponent, DashboardNavComponent],
  imports: [
    CommonModule,
    PmsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ]
})
export class PmsModule { }
