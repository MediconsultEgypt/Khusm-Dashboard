import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { DashboardDatatablesService } from '../dashboard-datatables.service';
import { prov_ratings } from '../dashboard-datatables.model';


@Component({
  selector: 'app-total-prov-ratings',
  templateUrl: './total-prov-ratings.component.html',
  styleUrls: ['./total-prov-ratings.component.css']
})
export class TotalProvRatingsComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  prov_ratings: prov_ratings[];
  selectedItems: prov_ratings[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];
  prov_category: any = {};

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;

  constructor(
    injector: Injector,
    private _DashboardDatatablesService: DashboardDatatablesService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get total visits
    this.getAll();

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
      { field: 'provider__name', header: 'Provider name' },
      { field: 'avg_rating', header: 'Average rating' },
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
    const data = this.prov_ratings;
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
    const data = document.getElementById("prov_ratings");
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

  // get total visits
  getAll() {
    this._DashboardDatatablesService.get_total_prov_ratings()
      .subscribe((res) => {
        this.prov_ratings = res;
      })
  }

}
