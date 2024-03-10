import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-add-pastor',
  templateUrl: './add-pastor.component.html',
  styleUrl: './add-pastor.component.scss'
})
export class AddPastorComponent implements OnInit {
  formSubmitted: boolean = false;
  formGrp!: FormGroup;
  @Input('id') id: number = 0;
  area: any = [];
  city: any = [];
  state: any = [];
  country: any = [];
  roleList: any = [];
  constructor(private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService) {

  }
  ngOnInit(): void {
    this.initForm();
    this.getAllStaticContent();
    if (this.id > 0)
      this.getById();
  }

  initForm() {
    this.formGrp = this.formBuilder.group({
      id: [this.id],
      address: [null, [Validators.required]],
      mobileNo: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      areaId: [0, [Validators.required]],
      cityId: [0, [Validators.required]],
      stateId: [0, [Validators.required]],
      countryId: [0, [Validators.required]],
      pincode: [0, [Validators.required]],
      regionId: [0, [Validators.required]],
      roleId: [0, [Validators.required]],
      createAt: [new Date()]
    });
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {

        this.area = data.areaList;
        this.city = data.cityList;
        this.state = data.stateList;
        this.country = data.countryList;
        this.roleList = data.roleList;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  getById() {
    this.service.commonGETCall(AppSettingsModule.pastorsService + '/' + this.id).subscribe((data: any) => {
      this.formGrp.patchValue(data);

    }, (err: any) => {
      this.toaster.error("Something went wrong", "Error !");
    });
  }
  submit() {
    this.formSubmitted = true;
    if (this.formGrp.valid) {
      let postData = this.formGrp.getRawValue();
      if (this.id > 0) {
        this.service
          .commonPUTCall(AppSettingsModule.pastorsService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Pastor updated successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
      else {
        this.service
          .commonPOSTCall(AppSettingsModule.pastorsService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Pastor added successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
    } else {
      this.toaster.error("Form invalid", "Error !");
    }
  }
}

