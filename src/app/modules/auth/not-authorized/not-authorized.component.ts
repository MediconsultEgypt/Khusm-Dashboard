import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { ProviderCategoriesListService } from '../../provider/provider-categories/prov-categories.service'
import { prov_categories_list } from '../../provider/provider-categories/prov-categories.model';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    
  }



}
