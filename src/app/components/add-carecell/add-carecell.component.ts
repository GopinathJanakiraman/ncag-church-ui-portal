import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-add-carecell',
  templateUrl: './add-carecell.component.html',
  styleUrl: './add-carecell.component.scss'
})
export class AddCarecellComponent implements OnInit {
  formSubmitted: boolean = false;
  religionList: any = [];
  memberType: any = [];
  area: any = [];
  city: any = [];
  state: any = [];
  country: any = [];
  occupation: any = [];
  carecellMembers: any = [];
  careForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService
  ) { }
  ngOnInit(): void {
    this.getAllStaticContent();
  }
  initForm() {
    this.careForm = this.formBuilder.group({
      area: [0]
    });
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {
        this.religionList = data.religionList;
        this.memberType = data.memberType;
        this.area = data.areaList;
        this.city = data.cityList;
        this.state = data.stateList;
        this.country = data.countryList;
        this.occupation = data.occupationList;
        this.initForm();
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }

  getCarecellMembers() {
    let areaID = this.careForm.get('area')?.value;
    this.service
      .commonGETCall(AppSettingsModule.getCarecellMembers + `0/area/${areaID}`)
      .subscribe((data: any) => {
        this.carecellMembers = data;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });

  }
}
