import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserFormComponent } from './userform/userform.component';
import { TypeuserformComponent } from './typeuserform/typeuserform.component';
import { UsertableComponent } from './usertable/usertable.component';
import { TypeusertableComponent } from './typeusertable/typeusertable.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/usertable', pathMatch: 'full' },
      { path: 'userform', component: UserFormComponent },
      { path: 'typeuserform', component: TypeuserformComponent },
      { path: 'usertable', component: UsertableComponent },
      { path: 'typeusertable', component: TypeusertableComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

