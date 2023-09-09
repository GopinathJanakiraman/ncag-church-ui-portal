import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/app/environments/environment';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class AppSettingsModule {
  public static ncagService = environment.ncagService;

  public static membersService = AppSettingsModule.ncagService + 'members';
  public static login =
    AppSettingsModule.ncagService + 'pastors/portal/authenticate';
  public static getAllStaticContent =
    AppSettingsModule.ncagService + 'members/getAllStaticContent';
}
