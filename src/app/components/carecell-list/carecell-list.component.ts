import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NcagService } from 'src/app/core/service/ncag.service';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carecell-list',
  templateUrl: './carecell-list.component.html',
  styleUrl: './carecell-list.component.scss'
})
export class CarecellListComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';

  carecellList: any = {};
  size: number = 2;
  pageNo: number = 1;
  pagesArray: number[] = [];
  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList(this.pageNo);
  }

  getAllList(pageNo: number) {
    this.pagesArray = [];
    this.carecellList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.carecellService + `?page=${pageNo - 1}&size=${this.size}`)
      .subscribe((dataset: any) => {
        this.carecellList = dataset;
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
