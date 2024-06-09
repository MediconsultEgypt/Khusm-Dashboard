import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { Offer_BannerData } from './offer-banner.model';
import { Offer_BannerService } from './offer-banner.service';

@Component({
    selector: 'app-offer-banner',
    templateUrl: './offer-banner.component.html',
    styleUrls: ['./offer-banner.component.css']
})
export class Offer_BannerComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  Offer_Banner: Offer_BannerData[];
  selectedProviderBranches: Offer_BannerData[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;

  constructor(
    // private messageService: MessageService,
    // private confirmationService: ConfirmationService,
    injector: Injector,
    private _Offer_BannerService: Offer_BannerService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get Offer_Banner
    this.getAll();

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
      { field: 'id', header: 'Id' },
      { field: 'title', header: 'Title' },
      { field: 'image', header: 'Image' },
      { field: 'provider', header: 'Provider' },
    ];
    this._selectedColumns = this.cols;

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    // *restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  // Export table data to PDF
  exportToPdf() {
    const data = this.Offer_Banner;
    const columns = this.getColumns(data);
    const rows = this.getRows(data, columns);
    const doc = new jsPDF();
    autoTable(doc,{
      head: [columns],
      body: rows
    });
    console.log(columns, rows)
    doc.save('file.pdf');
  }

  getColumns(data: any[]): string[] {
    const columns = [];
    data.forEach(row => {
      Object.keys(row).forEach(col => {
        if (!columns.includes(col)) {
          columns.push(col);
        }
      });
    });
    return columns;
  }

  getRows(data: any[], columns: string[]): any[] {
    const rows = [];
    data.forEach(row => {
      const values = [];
      columns.forEach(col => {
        values.push(row[col] || '');
      });
      rows.push(values);
    });
    return rows;
  }


  // *export to excel
  exportExcel() {
    const data = document.getElementById("Offer_Banner");
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'offer_banner.xlsx');
}

  checkSelected(col: [], colName: string) {
    let isFound = col.filter((el: any) => {
      return el?.field == colName;
    });
    return isFound.length > 0 ? true : false;
  }

  // get Offer_Banner
  getAll() {
    this._Offer_BannerService.get_all()
      .subscribe((res) => {
        this.Offer_Banner = res;
      }),
      (error) => {
        // Handle the error
        console.error(error);
      };
  }

}
