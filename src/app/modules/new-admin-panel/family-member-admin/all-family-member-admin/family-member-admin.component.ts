import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { family_memberData, userPackageResponse } from '../family-member-admin.model';
import { FamilyMemberAdminService } from '../family-member-admin.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-family-member-admin',
    templateUrl: './family-member-admin.component.html',
    styleUrls: ['./family-member-admin.component.css']
})
export class FamilyMemberAdminComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  family_memberData: family_memberData[];
  selectedItems: family_memberData[] | null = [];
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
    private _FamilyMemberAdminService: FamilyMemberAdminService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get first_name package
    this.getAll(1);

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
      { field: 'id', header: 'Id' },
      { field: 'phone_number', header: 'Phone number' },
      { field: 'family_member_status', header: 'Family member status' },
      { field: 'status', header: 'Status' },
      { field: 'payment_method', header: 'Payment method' },
      { field: 'first_name', header: 'First name' },
      { field: 'last_name', header: 'Last name' },
      { field: 'email', header: 'Email' },
      { field: 'is_wallet_payment', header: 'Is wallet payment' },
      { field: 'parent_user', header: 'Parent user' },
      { field: 'member_user', header: 'Member user' },
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
    // *restore original family-member-admin
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  // Export table data to PDF
  exportToPdf() {
    const data = this.family_memberData;
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
//     const data = document.getElementById("family_memberData");
//     const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
//     const wb: xlsx.WorkBook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
//     xlsx.writeFile(wb, 'file.xlsx');
// }

exportExcel() {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(this.family_memberData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'family_member');
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

  // get family_memberData
  getAll(page: number) {
    this._FamilyMemberAdminService.get_all(page)
      .subscribe((res: userPackageResponse) => {
        this.family_memberData = res.results;
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
