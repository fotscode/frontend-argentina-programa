import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { ErrorPageComponent } from './components/error-page/error-page.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { ProfileComponent, ProfileEditDialog } from './components/profile/profile.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthGuard } from './guard/auth.guard'
import { TokenInterceptorService } from './service/token-interceptor.service'

import { MaterialModule } from './material/material.module'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperienceComponent, ExperienceDeleteDialog, ExperienceEditDialog } from './components/experience/experience.component';
import { EducationComponent, EducationDeleteDialog, EducationEditDialog } from './components/education/education.component';
import { SkillDeleteDialog, SkillEditDialog, SkillsComponent } from './components/skills/skills.component';
import { ProjectDeleteDialog, ProjectEditDialog, ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorPageComponent,
    NavBarComponent,
    ProfileComponent,
    ProfileEditDialog,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceEditDialog,
    ExperienceDeleteDialog,
    EducationEditDialog,
    EducationDeleteDialog,
    SkillEditDialog,
    SkillDeleteDialog,
    ProjectEditDialog,
    ProjectDeleteDialog,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
