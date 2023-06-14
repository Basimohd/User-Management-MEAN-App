import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { adminAuthGuard } from 'src/app/guards/admin-auth.guard';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent,canActivate:[adminAuthGuard],children:[
    {path:'users',component:UserDetailsComponent},
    {path:'edit',component:EditUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
