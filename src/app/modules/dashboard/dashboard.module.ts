import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { MainHeaderModule } from 'src/app/core/default-layout/main-header/main-header.module';
import { MainSidebarModule } from 'src/app/core/default-layout/main-sidebar/main-sidebar.module';
import { MainFooterModule } from 'src/app/core/default-layout/main-footer/main-footer.module';
import { ControlSidebarModule } from 'src/app/core/default-layout/control-sidebar/control-sidebar.module';
import { DashboardService } from './dashboard.service';
import { ChartModule } from 'primeng/chart';
import { ProviderCategoriesListService } from '../provider/provider-categories/prov-categories.service';
import { TotalVisitsComponent } from './total-visits/total-visits.component';
import { PrimeNgModule } from '../primeng.module';
import { TotalProvComponent } from './total-provider-chart/total-prov.component';
import { TotalProvRatingsComponent } from './total-prov-ratings/total-prov-ratings.component';
import { DashboardDatatablesService } from './dashboard-datatables.service';
import { TotalProvOrdersComponent } from './total-prov-orders/total-prov-orders.component';
import { ProvBranchOrderComponent } from './total-prov-branches-orders/prov-branch-order.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MainHeaderModule,
    MainSidebarModule,
    ControlSidebarModule,
    MainFooterModule,
    ChartModule,
    PrimeNgModule,
  ],
  declarations: [
    DashboardComponent, 
    TotalVisitsComponent,
    TotalProvComponent,
    TotalProvRatingsComponent,
    TotalProvOrdersComponent,
    ProvBranchOrderComponent
  ],
  providers: [
    DashboardService, 
    ProviderCategoriesListService,
    DashboardDatatablesService
  ],
})
export class DashboardModule {
}
