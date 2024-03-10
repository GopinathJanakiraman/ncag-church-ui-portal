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
  public static pastorsService = AppSettingsModule.ncagService + 'pastors';
  public static regionService = AppSettingsModule.ncagService + 'pastors/region';
  public static areaService = AppSettingsModule.ncagService + 'pastors/area';
  public static login =
    AppSettingsModule.ncagService + 'pastors/portal/authenticate';
  public static getAllStaticContent =
    AppSettingsModule.ncagService + 'members/getAllStaticContent';
  public static carecellService = AppSettingsModule.ncagService + 'pastors/carecell';
  public static getCarecellMembers = AppSettingsModule.ncagService + 'members/carecell/';
  public static searchMembers = AppSettingsModule.ncagService + 'members/search/';
  public static assignCarecell = AppSettingsModule.ncagService + 'members/assigncarecell';
}
