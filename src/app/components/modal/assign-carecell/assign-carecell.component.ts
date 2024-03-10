import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-assign-carecell',
  templateUrl: './assign-carecell.component.html',
  styleUrl: './assign-carecell.component.scss'
})
export class AssignCarecellComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  memberList: number[] = [];
  religionList: any = [];
  memberType: any = [];
  area: any = [];
  city: any = [];
  state: any = [];
  country: any = [];
  occupation: any = [];

  size: number = 2;
  pageNo: number = 1;
  carecellList: any = [];

  areaId: number = 0;
  areaIdCarecell: number = 0;
  constructor(public bsModalRef: BsModalRef, private service: NcagService, private toaster: ToastrService) {
    this.getAllStaticContent();

  }
  ngOnInit() {
    console.log(this.memberList)
    console.log(this.title)
  }
  assignCarecell(id: number, areaId: number) {
    this.service.commonPOSTCall(AppSettingsModule.assignCarecell, { ids: this.memberList, careId: id, areaId: areaId }).subscribe((data: any) => {
      this.toaster.success("Carecell Group Created Succefully", "Success");
      this.bsModalRef.hide();
    }, (err: any) => {
      this.toaster.error("Something went wrong", "Error !");
    });
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {
        this.religionList = data.religionList;
        this.memberType = data.memberType;
        this.area = data.areaList;
        this.area.unshift({
          id: 0,
          name: "Select Area"
        })
        this.city = data.cityList;
        this.state = data.stateList;
        this.country = data.countryList;
        this.occupation = data.occupationList;
        this.search();
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  search() {
    let searchParam = {
      areaId: this.areaId || 0,
      page: 0,
      size: 10
    }
    this.service
      .commonPOSTCall(AppSettingsModule.carecellService + '/search', searchParam)
      .subscribe((dataset: any) => {
        this.carecellList = dataset;

      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
}
