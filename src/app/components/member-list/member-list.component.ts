import { Component, OnInit } from '@angular/core';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AssignCarecellComponent } from '../modal/assign-carecell/assign-carecell.component';
import { ToastrService } from 'ngx-toastr';

interface searchCriteria {
  page: number,
  size: number,
  areaId: number,
  firstName: string
}
@Component({
  selector: 'app-member',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';

  memberList: any = {};
  religionList: any = [];
  memberType: any = [];
  area: any = [];
  city: any = [];
  state: any = [];
  country: any = [];
  occupation: any = [];

  firstName: string = '';
  mobileNo: string = '';
  areaId: number = 0;
  pagesArray: number[] = [];
  size: number = 2;
  pageNo: number = 1;
  checkedIds: number[] = [];
  areaIdCareCell: number[] = [];
  bsModalRef?: BsModalRef;

  constructor(private service: NcagService, private modalService: BsModalService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllMembers(this.pageNo);
    this.getAllStaticContent();
  }

  getAllMembers(pageNo: number) {
    this.pagesArray = [];
    this.memberList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.membersService + `?page=${pageNo - 1}&size=${this.size}`)
      .subscribe((dataset: any) => {
        this.memberList = dataset;
        let i = 1;
        while (i <= dataset.totalPages) {
          this.pagesArray.push(i);
          i++;
        }

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

      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }

  searchMembers() {
    this.pagesArray = [];
    this.memberList = [];
    let searchParam = {
      areaId: this.areaId || 0,
      page: 0,
      size: 10,
      firstName: this.firstName || ''
    }
    this.service
      .commonPOSTCall(AppSettingsModule.searchMembers, searchParam)
      .subscribe((dataset: any) => {
        this.memberList = dataset;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  checkCheckBoxvalue(event: any, id: number, areaId: number) {
    if (event.target.checked) {
      this.checkedIds.push(id);
      this.areaIdCareCell.push(areaId);
    } else {
      let index = this.checkedIds.indexOf(id);
      this.checkedIds.splice(index, 1);
    }
    console.log(this.checkedIds);
  }
  assignCarecell() {
    if (this.checkedIds.length) {
      this.areaIdCareCell = [...new Set(this.areaIdCareCell)];
      if (this.areaIdCareCell.length > 1) {

        this.toaster.warning("Please choose members from one area", "Warning ! Multiple area detected");
        return;
      }
      const initialState: ModalOptions = {
        initialState: {
          memberList: this.checkedIds,
          title: 'Assign Members to Carecell',
          areaIdCarecell: this.areaIdCareCell[0]
        },
        class: 'modal-custom'
      };
      this.bsModalRef = this.modalService.show(AssignCarecellComponent, initialState);
      this.bsModalRef.content.closeBtnName = 'Close';



    } else {
      this.toaster.warning("Please choose members from one area", "Warning ! No Member Selected");
    }
  }
}