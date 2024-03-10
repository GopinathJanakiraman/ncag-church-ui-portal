import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  formSubmitted: boolean = false;
  formGrp!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService) {

  }
  ngOnInit(): void {
    this, this.initForm();
  }
  initForm() {
    this.formGrp = this.formBuilder.group({
      id: [0, [Validators.required]],
      password: [null, [Validators.required]],
      oldPassword: [null, [Validators.required]]
    });
  }
  submit() {
    this.formSubmitted = true;
    if (this.formGrp.valid) {
      let postData = this.formGrp.getRawValue();
      postData['id'] = this.service.secureStorage.getItem('userId');
      this.service
        .commonPOSTCall(AppSettingsModule.pastorsService + '/updatePassword', postData)
        .subscribe((response: any) => {
          this.toaster.success('Password updated successfully', 'Success');
        }, (err: any) => {
          this.toaster.error("Something went wrong", "Error !");
        });
    }
  }

}
