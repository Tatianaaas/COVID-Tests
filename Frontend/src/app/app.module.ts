import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './Components/user/user.component';
import { UserAddComponent } from './Components/user-add/user-add.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { TestAddComponent } from './Components/test-add/test-add.component';
import { AdminEditComponent } from './Components/admin-edit/admin-edit.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AdminUsersComponent } from './Components/admin-users/admin-users.component';
import { TestDateComponent } from './Components/test-date/test-date.component';
import { TestResultComponent } from './Components/test-result/test-result.component';
import { TestListComponent } from './Components/test-list/test-list.component';
import { TechnicComponent } from './Components/technic/technic.component';
import { TestUserDetailsComponent } from './Components/test-user-details/test-user-details.component';
import { AdminTestsComponent } from './Components/admin-tests/admin-tests.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { TestsStatisticsComponent } from './Components/tests-statistics/tests-statistics.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { PieChartUsersComponent } from './Components/pie-chart-users/pie-chart-users.component';


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
    TechnicComponent,
    TestUserDetailsComponent,
    AdminTestsComponent,
    UserListComponent,
    TestsStatisticsComponent,
    PieChartComponent,
    PieChartUsersComponent
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
    MatExpansionModule,
    ChartsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
