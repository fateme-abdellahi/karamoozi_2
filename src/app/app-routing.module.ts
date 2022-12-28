import { RouterModule, Routes } from '@angular/router';

import { LogedInComponent } from './pages/loged-in/loged-in.component';
import { NgModule } from '@angular/core';
import { SignedUpComponent } from './pages/signed-up/signed-up.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
 {path: '', component:SignupComponent},
 {path: 'signin', component:SigninComponent},
 {path:'signup-success', component:SignedUpComponent},
 {path:'login-success', component:LogedInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
