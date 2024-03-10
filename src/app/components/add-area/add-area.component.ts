import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrl: './add-area.component.scss'
})
export class AddAreaComponent implements OnInit {
  formSubmitted: boolean = false;
  formGrp!: FormGroup;
  area: any = [];
  regionList: any = [];
  @Input('id') id: number = 0;
  constructor(private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.getAllStaticContent();
    this.getAllRegionList();
  }
  initForm() {
    this.formGrp = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      name: [null, [Validators.required]],
      regionId: [null, [Validators.required]]
    });
  }
  getById() {
    this.service.commonGETCall(AppSettingsModule.areaService + '/' + this.id).subscribe((data: any) => {
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
        if (this.id > 0)
          this.getById();

      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  getAllRegionList() {
    this.service
      .commonGETCall(AppSettingsModule.regionService)
      .subscribe((dataset: any) => {
        this.regionList = dataset.content;
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
          .commonPUTCall(AppSettingsModule.areaService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Area updated successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
      else {
        this.service
          .commonPOSTCall(AppSettingsModule.areaService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Area added successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
    }
  }
}
