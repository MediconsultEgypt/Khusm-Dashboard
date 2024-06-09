import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { LocationService } from './location.service';
import { area, locationData } from './location.model';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  locationData: locationData[];
  areas: area[] = [];
  selectedProviderBranches: area[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;

  selectedParentColumns: any[] = [];
  childColumns: any[] = [];

  expandedRowKeys: { [key: string]: boolean } = {}; // To manage row expansion state

  constructor(
    // private messageService: MessageService,
    // private confirmationService: ConfirmationService,
    injector: Injector,
    private _LocationService: LocationService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get all
    this.getAll();

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
    { field: 'id', header: 'Id' },
    { field: 'governrate', header: 'Governrate' },
    // { field: 'area', header: 'Area' },
      { field: 'name', header: 'Name' },
      { field: 'lat', header: 'Latitude' },
      { field: 'lang', header: 'Longitude' },
      { field: 'address', header: 'Address' },
    ];
    // this._selectedColumns = this.cols;

    // Initialize selected columns for parent table without child-specific columns
    this.selectedParentColumns = this.cols.filter(col => !['name', 'lat', 'lang', 'address'].includes(col.field));
    // Initialize child columns with child-specific columns
    this.childColumns = this.cols.filter(col => ['name', 'lat', 'lang', 'address'].includes(col.field));

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  // toggleRow(locationData: any) {
  //   this.expandedRowKeys[locationData.id] = !this.expandedRowKeys[locationData.id];
  // }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    // *restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  // Export table data to PDF
  exportToPdf() {
    const data = this.locationData;
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
    const data = document.getElementById("locationData");
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

  // get all location
  getAll() {
    this._LocationService.get_all()
      .subscribe((res) => {
        this.locationData = res;
        for (let index = 0; index < res.length; index++) {
          var element = res[index].area;
          this.areas.push(element);
        }
        console.log(this.areas)
      }),
      (error) => {
        // Handle the error
        console.error(error);
      };
  }

  toggleRow(event: Event, rowData: any): void {
    event.preventDefault();
    if (this.expandedRowKeys[rowData.id]) {
      delete this.expandedRowKeys[rowData.id];
    } else {
      this.expandedRowKeys[rowData.id] = true;
    }
  }


  getDirections(lat: number, lng: number): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  }

}
