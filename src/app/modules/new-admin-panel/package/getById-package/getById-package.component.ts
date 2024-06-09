import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-getById-package',
  templateUrl: './getById-package.component.html',
  styleUrls: ['./getById-package.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdPackageComponent implements OnInit, OnDestroy {

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;
    
  // public
  public url = this.router.url;
  public lastValue;
  public data;
  
  //package items
  package: any = {};
  package_items: any[];

  // datatable 1 
  selectedServiceItems: any[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _PackageService: PackageService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._PackageService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });

    this.getById(this.lastValue);

    // *setting columns
    this.cols = [
      //   { field: this.serviceItemName, header: 'NAME' },
        { field: 'package_items', header: 'Package items' },
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
    const data = this.package_items;
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
    const data = document.getElementById("providers");
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'file.xlsx');
  }

  checkSelected(col: [], colName: string) {
    let isFound = col.filter((el: any) => {
      return el?.field == colName;
    });
    return isFound.length > 0 ? true : false;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
  }

  getById(id: number ) {
    this._PackageService.getByID(id)
      .then((res) => {
        this.package = res;
        this.package_items = this.package.package_items;
        console.log(this.package)
        console.log(this.package_items)
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }
}