import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';


const routes:Routes=[
  {path:'login',pathMatch:'full',component:LoginComponent},
  {path:'',pathMatch:'full',component:HomeComponent},
  {path: '**', pathMatch:'full', component:ErrorPageComponent}
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule { }
