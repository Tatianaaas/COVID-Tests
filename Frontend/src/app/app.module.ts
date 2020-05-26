import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './helper/jwt-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [
   {
     path: 'user',
     component: UserComponent,
     data: { title: 'User List' }
    },
   {
      path: 'user/show/:userId',
      component: UserDetailComponent,
      data: { title: 'User Details' },
      canActivate: [AuthGuardService]
    },
    {
        path: 'signup',
        component: UserAddComponent,
        data: { title: 'Add User' }
    },
    {
        path: 'user/update/:userId',
        component: UserEditComponent,
        data: { title: 'Edit User' },
        canActivate: [AuthGuardService]
        },
       {
          path: 'login', component: LoginComponent
        }, // default redirect to home

        {
           path: '**', redirectTo: 'login'
          }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserAddComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
