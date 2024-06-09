import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
// import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SocketService } from 'src/app/core/shared/socket.service';
import { DatePipe } from '@angular/common';
import { RolesService } from 'src/app/core/shared/services/roles.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationComponent } from 'src/app/core/shared/components/confirmation/confirmation.component';
import Swal from 'sweetalert2';
import { UsersService } from '../../user/users.service';
import { prov_categories_list } from './prov-categories.model';
import { ProviderCategoriesListService } from './prov-categories.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-prov-categories',
  templateUrl: './prov-categories.component.html',
  styleUrls: ['./prov-categories.component.css']
})
export class ProviderCategoriesComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  categories_list: prov_categories_list[];
  selectedServiceItems: prov_categories_list[] | null = [];
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];
  prov_category: any = {};

  public searchValue = '';
  public selectedOption = 10;
  public ColumnMode = ColumnMode;

  constructor(
    // private messageService: MessageService,
    // private confirmationService: ConfirmationService,
    injector: Injector,
    private _ProviderCategoriesListService: ProviderCategoriesListService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get provider categories list
    this.getAll_prov_categories_List();

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
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
    const data = this.categories_list;
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
    const data = document.getElementById("categories_list");
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'provider_categories.xlsx');
  }

  checkSelected(col: [], colName: string) {
    let isFound = col.filter((el: any) => {
      return el?.field == colName;
    });
    return isFound.length > 0 ? true : false;
  }

  // get providers categories list
  getAll_prov_categories_List() {
    this._ProviderCategoriesListService.get_prov_cat_list()
      .then((res) => {
        this.categories_list = res;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

}
