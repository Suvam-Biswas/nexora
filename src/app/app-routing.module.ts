import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginSignUpComponent } from './modules/auth/login-sign-up/login-sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginSignUpComponent
  },

  
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },



  // Optional: redirect any unknown URL to home
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
