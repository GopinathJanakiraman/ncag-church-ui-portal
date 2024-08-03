import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
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
  size: number = 10;
  pageNo: number = 1;
  pastorList: any = {};
  currentPage: number = 1;
  records: any = [];
  totalCount: number = 0;
  private destroy$ = new Subject<void>();
  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit() {
    this.getAllList(this.pageNo);
  }

  getAllList(pageNo: number) {
    this.pagesArray = [];
    this.pastorList = [];
    this.pageNo = pageNo;
    this.service
      .commonGETCall(AppSettingsModule.pastorsService + `/all?page=${pageNo - 1}&size=${this.size}`).pipe(takeUntil(this.destroy$))
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
