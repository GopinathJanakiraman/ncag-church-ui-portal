import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.scss'
})
export class RegionListComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';

  regionList: any = [];

  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList();
  }

  getAllList() {
    this.service
      .commonGETCall(AppSettingsModule.regionService)
      .subscribe((dataset: any) => {
        this.regionList = dataset;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
}
