import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './components/member/member.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NcagAuthGuard } from './core/auth-guard/ncag-authguard-service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [NcagAuthGuard],
    children: [
      {
        path: 'member',
        component: MemberComponent,
      },
      {
        path: 'add-member',
        component: AddMemberComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
