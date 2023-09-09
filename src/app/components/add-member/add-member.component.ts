import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  city: any = [];
  state: any = [];
  country: any = [];
  occupation: any = [];
  formSubmitted: boolean = false;

  memberForm!: FormGroup;
  formarr!: FormArray;
  social: any = [
    {
      name: 'fb',
      value: 'ww',
    },
    {
      name: 'tw',
      value: 'tw',
    },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private service: NcagService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllStaticContent();
    this.initForm();
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {
        this.religionList = data.religionList;
        this.memberType = data.memberType;
        this.city = data.cityList;
        this.state = data.stateList;
        this.country = data.countryList;
        this.occupation = data.occupationList;
        this.memberForm.patchValue({
          cityDetails: this.city[0],
          stateDetails: this.state[0],
          countryDetails: this.country[0],
        });
      });
  }
  initForm() {
    this.memberForm = this.formBuilder.group({
      id: [0],
      areaPastorId: [1],
      oldChurchId: [1],
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      mobileNo: [null, [Validators.required]],
      occupationDetails: [null, [Validators.required]],
      canVisitHouse: [false],
      isAttendingCHurch: [false],
      isCarecell: [false],
      isLetterAccepted: [false],
      martialStatus: [false],
      address: [null, [Validators.required]],
      cityDetails: [null, [Validators.required]],
      stateDetails: [null, [Validators.required]],
      countryDetails: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      memberTypeDetails: [this.memberType[0], [Validators.required]],
      religionDetails: [null, [Validators.required]],
      dob: [null, [Validators.required]],
      formArr: this.formBuilder.array([]),
    });
    this.getarr();
  }
  getarr() {
    let formArr = this.memberForm.get('formArr') as FormArray;
    formArr.push(this.createArr());
    formArr.push(this.createArr());
    formArr.patchValue(this.social);
  }
  get formArr() {
    return this.memberForm.get('formArr') as FormArray;
  }
  returnasFB(y: any) {
    return y as FormGroup;
  }
  createArr() {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }
  submit() {
    this.formSubmitted = true;
    if (this.memberForm.valid) {
      let postData = this.memberForm.getRawValue();
      this.service
        .commonPOSTCall(AppSettingsModule.membersService, postData)
        .subscribe((response: any) => {
          this.toaster.success('Member added successfully', 'Success');
        });
    }
  }
}
