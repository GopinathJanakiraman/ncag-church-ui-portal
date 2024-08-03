import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './components/member-list/member-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NcagAuthGuard } from './core/auth-guard/ncag-authguard-service';
import { NcagService } from './core/service/ncag.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { InterceptorService } from './core/service/http-interceptor-service';
import { CarecellListComponent } from './components/carecell-list/carecell-list.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { RegionListComponent } from './components/region-list/region-list.component';
import { PastorListComponent } from './components/pastor-list/pastor-list.component';
import { AddCarecellComponent } from './components/add-carecell/add-carecell.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AssignCarecellComponent } from './components/modal/assign-carecell/assign-carecell.component';
import { AddRegionComponent } from './components/add-region/add-region.component';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { AddPastorComponent } from './components/add-pastor/add-pastor.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CarecellCoverComponent } from './components/carecell-cover/carecell-cover.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    AddMemberComponent,
    LoginComponent,
    LayoutComponent,
    CarecellListComponent,
    RegionListComponent,
    AreaListComponent,
    PastorListComponent,
    AddCarecellComponent,
    AssignCarecellComponent,
    AddRegionComponent,
    AddAreaComponent,
    AddPastorComponent,
    ResetPasswordComponent,
    CarecellCoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    ModalModule.forRoot(),
    PaginationModule
  ],
  providers: [
    NcagAuthGuard,
    NcagService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
