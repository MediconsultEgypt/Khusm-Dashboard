import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { appStatsData, totalPackages, total_orders } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { ChartData } from 'chart.js';
import { ProviderCategoriesListService } from '../provider/provider-categories/prov-categories.service'
import { prov_categories_list } from '../provider/provider-categories/prov-categories.model';
import { UIChart } from 'primeng/chart';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit  {

  // @ViewChild('chartCanvas1') chartCanvas1: UIChart;
  // @ViewChild('chartCanvas2') chartCanvas2: UIChart;

  // @ViewChild('chartCanvas1', { static: true }) chartCanvas1: ElementRef;
  // @ViewChild('chartCanvas2', { static: true }) chartCanvas2: ElementRef;


  // @ViewChild('chartCanvas1') chartCanvas1: ElementRef<HTMLCanvasElement>;
  // @ViewChild('chartCanvas2') chartCanvas2: ElementRef<HTMLCanvasElement>;

  @ViewChild('chartCanvas1', { static: false }) chartCanvas1: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCanvas2', { static: false }) chartCanvas2: ElementRef<HTMLCanvasElement>;
  
  data: ChartData; 
  basicData: ChartData;
  
  // app stats data
  app_statsData: appStatsData;
  installs: number;
  score: number;
  comments: any[];

  // total packaes
  premium: totalPackages[];
  regular: totalPackages[];
  total: totalPackages[];

  // total orders data
  total_orders: total_orders;
  total_before_discount: any;
  total_after_discount: any;
  total_discount: any;
  total_khusm_discount: any;
  options: {};

  // total users
  total_users: number;

  // total providers
  total_providers: any;
  prov_cat: prov_categories_list[];
  prov_cat_name: prov_categories_list[];
  basicOptions: {};

  chart1: any;
  chart2: any;
  chart: Chart;
  options2: {};

  // total provider branches
  total_prov_branch: number;

  constructor( private _DashboardService: DashboardService, private _ProviderCategoriesListService: ProviderCategoriesListService) { }

  ngOnInit(): void {
    this.getAppStats();
    this.getPremium();
    this.getRegular();
    this.getTotal();
    this.get_total_orders();
    this.get_TotalUsers();

    this.get_TotalProvBranch();
    

    // this.get_totalProv();
  }

  ngOnDestroy(): void {
    // Destroy charts when the component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
    // if (this.chart) {
    //   this.chart.destroy();
    // }
  }

  ngAfterViewInit(): void {
    // Initialize the first chart after the view is initialized
    this.get_total_orders();
  }



  // get app stats
  getAppStats() {
    this._DashboardService.get_appStats().subscribe((res) => {
      this.app_statsData = res;
      this.installs = this.app_statsData.Installs;
      this.score = this.app_statsData.Score;
      this.comments = this.app_statsData.Comments;
    })
  }

  // get total packages
  // premium
  getPremium() {
    this._DashboardService.get_PremiumPackages().subscribe((res) => {
      this.premium = res.total_packages;
    })
  }
  // regular
  getRegular() {
    this._DashboardService.get_RegularPackages().subscribe((res) => {
      this.regular = res.total_packages;
    })
  }
  // total
  getTotal() {
    this._DashboardService.get_TotalPackages().subscribe((res) => {
      this.total = res.total_packages;
    })
  }

  // get total orders
  // get_total_orders() {
  //   this._DashboardService.get_total_orders().subscribe((res) => {
  //     this.total_before_discount = res.total_before_discount;
  //     this.total_after_discount = res.total_after_discount;
  //     this.total_discount = res.total_discount;
  //     this.total_khusm_discount = res.total_khusm_discount;

  //     // Initialize your data and options
  //   this.data = {
  //     labels: ['Total Before Discount', 'Total After Discount', 'Total Discount', 'Total Khusm Discount'],
  //     datasets: [
  //       {
  //         data: [
  //           this.total_before_discount,
  //           this.total_after_discount,
  //           this.total_discount,
  //           this.total_khusm_discount
  //         ],
  //         backgroundColor: [
  //           '#FF6384',
  //           '#36A2EB',
  //           '#FFCE56',
  //           '#4BC0C0'
  //         ]
  //       }
  //     ]
  //   };

  //   this.options = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     // Add any other chart options you need
  //   };
  //   })
  // }

  get_total_orders() {
    this._DashboardService.get_total_orders().subscribe((res) => {
      this.data = {
        labels: ['Total Before Discount', 'Total After Discount', 'Total Discount', 'Total Khusm Discount'],
        datasets: [
          {
            data: [
              res.total_before_discount,
              res.total_after_discount,
              res.total_discount,
              res.total_khusm_discount
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0'
            ]
          }
        ]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.chartCanvas1.nativeElement, {
        type: 'doughnut',
        data: this.data,
        options: this.options
      });
    });
  }

   // total users
   get_TotalUsers() {
     this._DashboardService.get_total_users().subscribe((res) => {
      this.total_users = res['Total Users'];
    })
  }

  // total providers
  // get_totalProv(){
  //   // get provider categories id
  //   this._ProviderCategoriesListService.get_prov_cat_list().then((res) => {
  //     this.prov_cat = res.map(obj => obj.id);
  //     this.prov_cat_name = res.map(obj => obj.name);
  //     for (let i = 0; i < this.prov_cat.length; i++) {
  //       let element: any;
  //       element = this.prov_cat[i];
  //       let element_name: any
  //       element_name = this.prov_cat_name[i];

  //       // get total provider category
  //       this._DashboardService.get_total_providers(element).subscribe((res) => {
  //         this.total_providers = res;
  //         console.log(element, element_name, this.total_providers)
          
  //         // Initialize your data and options
  //         this.basicData = {
  //           labels: element_name,
  //           datasets: [
  //             {
  //               data: this.total_providers,

  //               backgroundColor: [
  //                 '#FF6384',
  //                 '#36A2EB',
  //                 '#FFCE56',
  //                 '#4BC0C0',

  //                 '#c57880',
  //               ]
  //             }
  //           ]
  //         };
      
  //         this.options = {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           // Add any other chart options you need
  //         };
  //       })
  //     }
  //   })
  // }

  get_totalProv() {
    this._ProviderCategoriesListService.get_prov_cat_list().then((res) => {
      this.prov_cat = res.map(obj => obj.id);
      this.prov_cat_name = res.map(obj => obj.name);
      let providerData = [];
      let providerLabels = [];

      let providerRequests = this.prov_cat.map((categoryId, index) => {
        return this._DashboardService.get_total_providers(categoryId).toPromise().then((totalProviders) => {
          providerData.push(totalProviders);
          providerLabels.push(this.prov_cat_name[index]);
        });
      });

      Promise.all(providerRequests).then(() => {
        this.basicData = {
          labels: providerLabels,
          datasets: [
            {
              data: providerData,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#c57880',
                '##4cd07d',
                '#036475',
                '##c93d82',
                '##816204',
                '#c40f2f'
              ]
            }
          ]
        };

        this.options2 = {
          responsive: true,
          maintainAspectRatio: false,
        };

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(this.chartCanvas2.nativeElement, {
          type: 'pie',
          data: this.basicData,
          options: this.options2
        });
      });
    });
  }


   // total provider branches
   get_TotalProvBranch() {
    this._DashboardService.get_total_prov_branches().subscribe((res) => {
     this.total_prov_branch = res.total_provider_branches;
   })
 }

//  onTabChange(tabId: string) {
//   if (this.chart) {
//     this.chart.destroy();
//   }

//   if (tabId === 'sales-chart') {
//     this.get_total_orders();
//   } else if (tabId === 'revenue-chart') {
//     this.get_totalProv();
//   }
// }

}
