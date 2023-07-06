import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SortContactsPipe } from './sort-contact.pipes';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './admin/admin.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { SecureComponent } from './secure/secure.component';
import { authGuardGuard } from './auth-guard.guard';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'services', component: ServicesComponent },
  // { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'admin', component: AdminComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuardGuard] },
  { path: 'updateUser/:id', component: UpdateComponent },
  { path: 'deleteUser/:id', component: DeleteComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutComponent,
    ProjectComponent,
    ServicesComponent,
    ContactComponent,
    LoginComponent,
    AdminComponent,
    SortContactsPipe,
    UpdateComponent,
    DeleteComponent,
    SecureComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [], //Add AuthGuard to providers
  bootstrap: [AppComponent],
})
export class AppModule {}
