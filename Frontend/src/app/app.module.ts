import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { TestAddComponent } from './test-add/test-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TestDateComponent } from './test-date/test-date.component';
import { TestResultComponent } from './test-result/test-result.component';
import { TestListComponent } from './test-list/test-list.component';
import { TechnicComponent } from './technic/technic.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserAddComponent,
    UserDetailComponent,
    UserEditComponent,
    NavbarComponent,
    LoginComponent,
    TestComponent,
    TestAddComponent,
    AdminEditComponent,
    AdminComponent,
    AdminUsersComponent,
    TestDateComponent,
    TestResultComponent,
    TestListComponent,
    TechnicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
