import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class NcagAuthGuard {
  public capabilities: any = {};
  constructor(private cookie: CookieService, private router: Router) {}

  canActivate() {
    let activateStatus: boolean = false;
    if (this.cookie.get('login')) {
      let loginResponse = JSON.parse(this.cookie.get('login'));
      activateStatus = loginResponse.access_token ? true : false;
    }
    return true;

    if (!activateStatus) {
      this.router.navigate(['/']);
    }
  }
}
