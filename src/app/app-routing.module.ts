import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NcagAuthGuard } from './core/auth-guard/ncag-authguard-service';
import { CarecellListComponent } from './components/carecell-list/carecell-list.component';
import { RegionListComponent } from './components/region-list/region-list.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { PastorListComponent } from './components/pastor-list/pastor-list.component';
import { AddCarecellComponent } from './components/add-carecell/add-carecell.component';
import { AddRegionComponent } from './components/add-region/add-region.component';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { AddPastorComponent } from './components/add-pastor/add-pastor.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CarecellCoverComponent } from './components/carecell-cover/carecell-cover.component';


@NgModule({
  imports: [RouterModule.forRoot([
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
          component: MemberListComponent,
        },
        {
          path: 'member/add-member',
          component: AddMemberComponent,
        },
        {
          path: 'member/edit-member/:id',
          component: AddMemberComponent,
        },
        {
          path: 'carecell',
          component: CarecellListComponent,
        },
        {
          path: 'carecell/add',
          component: AddCarecellComponent
        },
        {
          path: 'area-list',
          component: AreaListComponent,
        },
        {
          path: 'region-list',
          component: RegionListComponent,
        },
        {
          path: 'pastor-list',
          component: PastorListComponent,
        },
        {
          path: 'region-list/add-region/:id',
          component: AddRegionComponent,
        },
        {
          path: 'area-list/add-area/:id',
          component: AddAreaComponent,
        },
        {
          path: 'pastor-list/add-pastor/:id',
          component: AddPastorComponent,
        },
        {
          path: 'reset-password',
          component: ResetPasswordComponent,
        },
        {
          path: 'carecell-cover',
          component: CarecellCoverComponent,
        }
      ],
    }
  ], { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
