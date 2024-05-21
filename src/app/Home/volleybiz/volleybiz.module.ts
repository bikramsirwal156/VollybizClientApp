import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VolleybizRoutingModule } from './volleybiz-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../Services/employee.service';
@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    VolleybizRoutingModule
  ],
  providers:[EmployeeService]
})
export class VolleybizModule { }
