import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  religionList: any = [];
  memberType: any = [];
  area: any = [];
  city: any = [];
  state: any = [];
  country: any = [];
  occupation: any = [];
  formSubmitted: boolean = false;

  memberForm!: FormGroup;
  memberDetails!: any;

  @Input('id') pathId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService
  ) { }
  ngOnInit(): void {
    this.getAllStaticContent();
    this.initForm();
    if (this.pathId) {
      this.service
        .commonGETCall(AppSettingsModule.membersService + '/' + this.pathId).subscribe((data: any) => {
          this.memberDetails = data;
          this.memberForm.patchValue(this.memberDetails);
        }, (err: any) => {
          this.toaster.error("Something went wrong", "Error !");
        })
    }
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
        this.memberForm.patchValue({
          cityDetails: this.city[0],
          stateDetails: this.state[0],
          countryDetails: this.country[0],
        });
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  initForm() {
    this.memberForm = this.formBuilder.group({
      id: [0],
      areaPastorDetails: this.formBuilder.group({
        id: [1]
      }),
      oldChurchId: [1],
      pastorId: [],
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobileNo: [null, [Validators.required]],
      occupationId: [null, [Validators.required]],
      canVisitHouse: [false],
      isAttendingCHurch: [false],
      isCarecell: [false],
      isLetterAccepted: [false],
      martialStatus: [false],
      address: [null, [Validators.required]],
      carecellId: [0, [Validators.required]],
      areaId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      stateId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      memTypeId: [this.memberType[0], [Validators.required]],
      religionId: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      createAt: null
    });
  }


  submit() {
    this.formSubmitted = true;
    if (this.memberForm.valid) {
      let postData = this.memberForm.getRawValue();
      postData.dob = new Date(postData.dob)
      if (this.pathId) {
        this.service
          .commonPUTCall(AppSettingsModule.membersService + '/' + this.pathId, postData)
          .subscribe((response: any) => {
            this.toaster.success('Member updated successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
      else {
        this.service
          .commonPOSTCall(AppSettingsModule.membersService, postData)
          .subscribe((response: any) => {
            this.toaster.success('Member added successfully', 'Success');
          }, (err: any) => {
            this.toaster.error("Something went wrong", "Error !");
          });
      }
    }
  }
}
