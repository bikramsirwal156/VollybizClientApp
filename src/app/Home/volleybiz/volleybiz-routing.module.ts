import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverViewGridComponent } from '../components/over-view-grid/over-view-grid.component';
import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../components/edit-employee/edit-employee.component';

const routes: Routes = [
  {path:'',component:OverViewGridComponent,title:'Grid'},
  {path:'add',component:AddEmployeeComponent,title:'Add Epmployee'},
  {path:'edit',component:EditEmployeeComponent,title:'Edit Epmployee'}


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolleybizRoutingModule { }
