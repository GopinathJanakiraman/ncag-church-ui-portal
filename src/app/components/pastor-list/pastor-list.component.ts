import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-pastor-list',
  templateUrl: './pastor-list.component.html',
  styleUrl: './pastor-list.component.scss'
})
export class PastorListComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';
  pagesArray: number[] = [];
  size: number = 2;
  pageNo: number = 1;
  pastorList: any = {};

  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList(this.pageNo);
  }

  getAllList(pageNo: number) {
    this.pagesArray = [];
    this.pastorList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.pastorsService + `/all?page=${pageNo - 1}&size=${this.size}`)
      .subscribe((dataset: any) => {
        this.pastorList = dataset;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
}
