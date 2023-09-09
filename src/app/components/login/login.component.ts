import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  registerForm!: FormGroup;
  constructor(
    private service: NcagService,
    private router: Router,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    if (this.cookie.get('login')) {
      this.router.navigate(['dashboard/member']);
    }
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  login() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.service
        .commonPOSTCall(
          AppSettingsModule.login,
          this.registerForm.getRawValue()
        )
        .subscribe(
          (res: any) => {
            this.cookie.set('login', JSON.stringify(res), 0, '/');

            this.service.secureStorage.setItem('roleId', res.pastor.roleId);
            this.service.secureStorage.setItem('userId', res.pastor.id);
            this.service.secureStorage.setItem(
              'firstName',
              res.pastor.firstName + ' ' + res.pastor.lastName
            );

            this.router.navigate(['dashboard/member']);
          },
          (err: any) => {
            let errMsg =
              err && err.error.Error_Description
                ? err.error.Error_Description
                : 'Oops ! Something went wrong';
            this.router.navigate(['dashboard/member']);
            this.toastr.error(errMsg, 'Error!');
          }
        );
    }
  }
}
