import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NcagService } from 'src/app/core/service/ncag.service';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/internal/Subject';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-carecell-list',
  templateUrl: './carecell-list.component.html',
  styleUrl: './carecell-list.component.scss'
})
export class CarecellListComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';

  carecellList: any = {};
  size: number = 50;
  pageNo: number = 1;

  records: any = [];
  totalCount: number = 0;
  currentPage: number = 1;
  private destroy$ = new Subject<void>();
  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList(this.pageNo);
  }

  getAllList(pageNo: number) {

    this.carecellList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.carecellService + `?page=${pageNo - 1}&size=${this.size}`).pipe(takeUntil(this.destroy$))
      .subscribe((dataset: any) => {
        this.records = dataset.content;
        this.totalCount = dataset.totalElements;
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  pageChanged(pageevent: PageChangedEvent) {
    this.getAllList(pageevent.page);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
