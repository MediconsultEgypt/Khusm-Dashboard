import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { ProviderViewSetListService } from '../provider-viewSet.service';
import { provider_product } from '../../provider-list/provider-list.model';
import { provider_barnch } from '../provider-viewSet.model';

@Component({
  selector: 'app-getById-provider-viewSet',
  templateUrl: './getById-provider-viewSet.component.html',
  styleUrls: ['./getById-provider-viewSet.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GetByIdProviderViewSetComponent implements OnInit, OnDestroy {

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;
    
  // public
  public url = this.router.url;
  public lastValue;
  public data;
  
  //provider viewSet
  provider: any = {};
  provider_product: provider_product[];
  provider_barnch: provider_barnch[];

  // datatable 1 
  selectedServiceItems: provider_product[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];

  // datatable 2
  selectedBranchItems: provider_barnch[] | null = [];
  branch_cols: any[] = [];
  branch_selectedColumns: any[] = [];
  branch_exportColumns: any[] = [];
  lat: number;
  long: number;

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  
  // private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _ProviderViewSetListService: ProviderViewSetListService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // this._ProviderViewSetListService.onUserViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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

      this.branch_cols = [
        //   { field: this.serviceItemName, header: 'NAME' },
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'distance', header: 'Distance' },
        { field: 'location', header: 'Location' },
        { field: 'email', header: 'Email' },
        { field: 'branch_online_order_available', header: 'Online order available' },
        { field: 'provider', header: 'Provider' },
        { field: 'user', header: 'User' },
        ];
        this.branch_selectedColumns = this.branch_cols;

        this.branch_exportColumns = this.branch_cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
          }));
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  @Input() get branchSelectedColumns(): any[] {
    return this.branch_selectedColumns;
  }

  set selectedColumns(val: any[]) {
    // *restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
}

   set branchSelectedColumns(val: any[]) {
        this.branch_selectedColumns = this.branch_cols.filter((col) => val.includes(col));
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
    this._ProviderViewSetListService.getByID(id)
      .then((res) => {
        this.provider = res;
        this.provider_product = this.provider.provider_product;
        this.provider_barnch = this.provider.provider_barnch;

        this.lat = this.provider.provider_barnch.latitude;
        this.long = this.provider.provider_barnch.longitude;
        // console.log(this.lat, this.long)
        // console.log(this.provider.provider_barnch.latitude)
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
      });
  }

  getDirections(latitude: number, longitude: number): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
}