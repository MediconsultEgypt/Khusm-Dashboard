import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderOrdersListComponent } from './provider-orders/all-provider-orders/provider-orders-list.component';
import { OrderHistoryComponent } from './order-history/order-history-list/order-history.component';

const routes: Routes = [
  { path: 'provider-orders', component: ProviderOrdersListComponent },
  { path: 'order-history', component: OrderHistoryComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule{}