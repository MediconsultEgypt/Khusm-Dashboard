import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { userPackageData, userPackageResponse } from '../user-package.model';
import { UserPackageService } from '../user-package.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-user-package',
    templateUrl: './user-package.component.html',
    styleUrls: ['./user-package.component.css']
})
export class UserPackageComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  userPackageData: userPackageData[];
  selectedProviderBranches: userPackageData[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];
  provider: any = {};

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;

  // pagination
  count: number = null;
  next: string = null;
  pages_number: number = null;
  previous: string = null;

  constructor(
    // private messageService: MessageService,
    // private confirmationService: ConfirmationService,
    injector: Injector,
    private _UserPackageService: UserPackageService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get user package
    this.getAll(1);

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
      { field: 'id', header: 'Id' },
      { field: 'created_at', header: 'Created at' },
      { field: 'start_date', header: 'Start date' },
      { field: 'end_date', header: 'End date' },
      { field: 'has_package', header: 'Has package' },
      { field: 'user', header: 'User' },
      { field: 'package', header: 'Package' },
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
    // *restore original user-package
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  // Export table data to PDF
  exportToPdf() {
    const data = this.userPackageData;
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
//   exportExcel() {
//     const data = document.getElementById("userPackageData");
//     const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
//     const wb: xlsx.WorkBook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
//     xlsx.writeFile(wb, 'userPackageData.xlsx');
// }

exportExcel() {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(this.userPackageData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'user_package');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE,
  });
  FileSaver.saveAs(
    data,
    fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
  );
}

  checkSelected(col: [], colName: string) {
    let isFound = col.filter((el: any) => {
      return el?.field == colName;
    });
    return isFound.length > 0 ? true : false;
  }

  // get userPackageData
  getAll(page: number) {
    this._UserPackageService.get_all(page)
      .subscribe((res: userPackageResponse) => {
        this.userPackageData = res.results;
        this.count = res.count;
        this.pages_number = res.pages_number;

        // get the next page number
        const next_url = res.next;
        const next_urlObj = new URL(next_url);
        const searchNextParams = new URLSearchParams(next_urlObj.search);
        this.next = searchNextParams.get("page");

        // get the previous page number
        const prev_url = res.previous;
        const prev_urlObj = new URL(prev_url);
        const searchPrevParams = new URLSearchParams(prev_urlObj.search);
        this.previous = searchPrevParams.get("page");
      }),
      (error) => {
        // Handle the error
        console.error(error);
      };
  }

  onPageChange(event: any): void {
    this.getAll(event.page +1);
  }

}
