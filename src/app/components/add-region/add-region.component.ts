import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrl: './add-region.component.scss'
})
export class AddRegionComponent implements OnInit {
  formSubmitted: boolean = false;
  formGrp!: FormGroup;
  area: any = [];
  pastorList: any = [];
  @Input('id') id: number = 0;
  constructor(private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getAllStaticContent();

  }
  initForm() {
    this.formGrp = this.formBuilder.group({
      regionId: [this.id],
      regionName: [null, [Validators.required]],
      pastorId: [null, [Validators.required]]
    });
  }
  getById() {
    this.service.commonGETCall(AppSettingsModule.regionService + '/' + this.id).subscribe((data: any) => {
      this.formGrp.patchValue(data);
    }, (err: any) => {
      this.toaster.error("Something went wrong", "Error !");
    });
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {

        this.area = data.areaList;
        this.pastorList = data.pastorList;
        if (this.id > 0)
          this.getById();

      });
  }
  submit() {
    this.formSubmitted = true;
    if (this.formGrp.valid) {
      let postData = this.formGrp.getRawValue();
      if (this.id > 0) {
        this.service
          .commonPUTCall(AppSettingsModule.regionService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Region updated successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
      else {
        this.service
          .commonPOSTCall(AppSettingsModule.regionService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Region added successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
    } else {
      this.toaster.error("Form invalid", "Error !");
    }
  }
}
