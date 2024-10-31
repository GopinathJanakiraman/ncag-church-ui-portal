import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsModule } from 'src/app/core/app-settings/app-settings-module';
import { NcagService } from 'src/app/core/service/ncag.service';

@Component({
  selector: 'app-carecell-cover',
  templateUrl: './carecell-cover.component.html',
  styleUrl: './carecell-cover.component.scss'
})
export class CarecellCoverComponent implements OnInit {
  area: any = [];
  size: number = 200;
  pageNo: number = 1;
  pagesArray: number[] = [];
  carecellList: any = [];
  areaId: number = 0;
  regionId: any;
  week: string = 'I';
  month: string = new Date().toLocaleString('default', { month: 'short' });
  year: number = new Date().getFullYear();
  weeks: string[] = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  regionList: any = [];
  constructor(private service: NcagService, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.getAllStaticContent();
  }
  getAllRegionList() {
    this.service
      .commonGETCall(AppSettingsModule.regionService)
      .subscribe((dataset: any) => {
        this.regionList = dataset.content;
        this.regionList.unshift({ regionId: 0, regionName: "Select Region", areaList: [] })
        console.log(this.regionList)
        this.search();
      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  getAllStaticContent() {
    this.service
      .commonGETCall(AppSettingsModule.getAllStaticContent)
      .subscribe((data: any) => {
        this.area = data.areaList;
        this.area.unshift({
          id: 0,
          name: "Select Area"
        })

        this.getAllRegionList();

      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
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
  search() {
    let searchParam = {
      areaList: this.areaId ? this.areaId : this.regionId?.areaList.map((a: any) => a.id),
      page: 0,
      size: 100000
    }
    this.service
      .commonPOSTCall(AppSettingsModule.carecellService + '/search', searchParam)
      .subscribe((dataset: any) => {
        this.carecellList = dataset;

      }, (err: any) => {
        this.toaster.error("Something went wrong", "Error !");
      });
  }
  print() {
    var divContents = document?.getElementById("printable")?.innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    if (a) {
      a.document.write('<html>');
      a.document.write('<body>');
      if (divContents) {
        a.document.write(divContents);
      }
      a.document.write('</body></html>');
      a.document.close();
      a.print();
    }
  }
}
