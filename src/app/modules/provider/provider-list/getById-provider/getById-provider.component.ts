import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProviderListService } from '../provider-list.service';
import { provider_product } from '../provider-list.model';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-getById-provider',
  templateUrl: './getById-provider.component.html',
  styleUrls: ['./getById-provider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderComponent implements OnInit, OnDestroy {

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;
    
  // public
  public url = this.router.url;
  public lastValue;
  public data;
  
  //provider
  provider: any = {};
  provider_product: provider_product[];

  // datatable
  selectedServiceItems: provider_product[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderListService: ProviderListService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderListService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });

    this.getById(this.lastValue);

    // *setting columns
    this.cols = [
      //   { field: this.serviceItemName, header: 'NAME' },
        { field: 'discount', header: 'Discount' },
        { field: 'for_package', header: 'For package' },
        { field: 'provider', header: 'Provider' },
        { field: 'id', header: 'Category id' },
        { field: 'name', header: 'Category name' },
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
    const data = this.provider_product;
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
    this._ProviderListService.getByID(id)
      .then((res) => {
        this.provider = res;
        this.provider_product = this.provider.provider_product;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}