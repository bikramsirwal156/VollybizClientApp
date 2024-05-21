import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'home',loadChildren:()=>import('./Home/volleybiz/volleybiz.module').then(x=>x.VolleybizModule)},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**',redirectTo:'home'}
];