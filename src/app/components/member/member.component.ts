import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  pageSize: number = 8;

  ActivityTableData: string = 'Activity Table Data';

  memberList: any = [];

  constructor(private service: NcagService) {}
  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.service
      .commonGETCall(AppSettingsModule.membersService)
      .subscribe((dataset: any) => {
        this.memberList = dataset;
      });
  }
}
