import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberComponent } from './components/member/member.component';
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
import { TextboxComponent } from './components/textbox/textbox.component';
@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    AddMemberComponent,
    LoginComponent,
    LayoutComponent,
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
    TextboxComponent,
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
export class AppModule {}
