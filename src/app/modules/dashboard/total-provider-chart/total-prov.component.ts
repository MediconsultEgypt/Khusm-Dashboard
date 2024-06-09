import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { ProviderCategoriesListService } from '../../provider/provider-categories/prov-categories.service'
import { prov_categories_list } from '../../provider/provider-categories/prov-categories.model';
import { UIChart } from 'primeng/chart';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-total-prov',
  templateUrl: './total-prov.component.html',
  styleUrls: ['./total-prov.component.css']
})
export class TotalProvComponent implements OnInit {



  data: ChartData; 
  basicData: ChartData;

  // total providers
  total_providers: any;
  prov_cat: prov_categories_list[];
  prov_cat_name: prov_categories_list[];
  options: {};


  constructor( private _DashboardService: DashboardService, private _ProviderCategoriesListService: ProviderCategoriesListService) { }

  ngOnInit(): void {
    this.get_totalProv();
  }


  // total providers
  get_totalProv(){
    // get provider categories id
    this._ProviderCategoriesListService.get_prov_cat_list().then((res) => {
      this.prov_cat = res.map(obj => obj.id);
      this.prov_cat_name = res.map(obj => obj.name);
      for (let i = 0; i < this.prov_cat.length; i++) {
        let element: any;
        element = this.prov_cat[i];
        let element_name: any
        element_name = this.prov_cat_name[i];

        // get total provider category
        this._DashboardService.get_total_providers(element).subscribe((res) => {
          this.total_providers = res;
          console.log(element, element_name, this.total_providers)
          
          // Initialize your data and options
          this.data = {
            labels: element_name,
            datasets: [
              {
                data: this.total_providers,

                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',

                  '#c57880',
                ]
              }
            ]
          };
      
          this.options = {
            responsive: true,
            maintainAspectRatio: false,
            // Add any other chart options you need
          };
        })
      }
    })
  }


}
