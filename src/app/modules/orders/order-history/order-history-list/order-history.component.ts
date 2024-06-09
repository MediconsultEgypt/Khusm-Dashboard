import { Component, ElementRef, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
// import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SocketService } from 'src/app/core/shared/socket.service';
import { DatePipe } from '@angular/common';
import { RolesService } from 'src/app/core/shared/services/roles.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationComponent } from 'src/app/core/shared/components/confirmation/confirmation.component';
import Swal from 'sweetalert2';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import { OrderHistoryService } from '../order-history.service';
import { orderHistoryData } from '../order-history.model';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  orderHistory: orderHistoryData[];
  selectedOrderHistory: orderHistoryData[] | null = [];
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
    private _OrderHistoryService: OrderHistoryService
    ) {
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // super(injector);
    // this.isEnglish
    //   ? (this.serviceItemName = 'nameEn')
    //   : (this.serviceItemName = 'nameAr');
  }

  ngOnInit(): void {
    // get order history
    this.  getAll_order_history();

    // *setting columns
    this.cols = [
    //   { field: this.serviceItemName, header: 'NAME' },
    { field: 'id', header: 'Id' },
    { field: 'total_amount_before_discount', header: 'Total amount before discount' },
    { field: 'provider_name', header: 'Provider name' },
    { field: 'provider_branch', header: 'Provider branch' },      
    { field: 'timestamp', header: 'Timestamp' },
    { field: 'paid_amount', header: 'Paid amount' },      
    { field: 'discount', header: 'Discount' },      
    { field: 'transaction_id', header: 'Transaction id' },
    { field: 'user', header: 'User' },
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
    const data = this.orderHistory;
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
    const data = document.getElementById("orderHistory");
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(data);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'order_history.xlsx');
  }

  checkSelected(col: [], colName: string) {
    let isFound = col.filter((el: any) => {
      return el?.field == colName;
    });
    return isFound.length > 0 ? true : false;
  }

  // get order history list
    getAll_order_history() {
    this._OrderHistoryService.get_order_history_list()
      .subscribe((res) => {
        this.orderHistory = res.data;
      }),
      (error) => {
        // Handle the error
        console.error(error);
      };
  }

}
