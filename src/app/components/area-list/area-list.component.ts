import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent implements OnInit {
  pagesArray: number[] = [];
  size: number = 2;
  pageNo: number = 1;
  ActivityTableData: string = 'Activity Table Data';

  areaList: any = {};

  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList(this.pageNo);
  }

  getAllList(pageNo: number) {
    this.pagesArray = [];
    this.areaList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.areaService + `?page=${pageNo - 1}&size=${this.size}`)
      .subscribe((dataset: any) => {
        this.areaList = dataset;
        let i = 1;
        while (i <= dataset.totalPages) {
          this.pagesArray.push(i);
          i++;
        }
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
}
