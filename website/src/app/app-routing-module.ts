import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './user/home/home';
import {  Submit } from './user/submit/submit';
import { Track } from './user/track/track';
import { Mycmp } from './user/mycmp/mycmp';
import { Profile } from './user/profile/profile';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'submit', component: Submit, canActivate: [AuthGuard]},
  {path: 'track', component: Track, canActivate: [AuthGuard]},
  {path: 'complaint', component: Mycmp, canActivate: [AuthGuard]},
  {path: 'profile', component: Profile, canActivate: [AuthGuard]},
  {path: 'login', component: Login},
  {path: 'register', component: Register}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
