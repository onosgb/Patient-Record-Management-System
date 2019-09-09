import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pms/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'pms', loadChildren: './components/pms/pms.module#PmsModule'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
