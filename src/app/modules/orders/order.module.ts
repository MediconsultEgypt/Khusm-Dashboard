import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedAppModule } from "src/app/core/shared/shared.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrimeNgModule } from "../primeng.module";
import { OrderRoutingModule } from "./order-routing.module";
import { ProviderOrdersListComponent } from "./provider-orders/all-provider-orders/provider-orders-list.component";
import { ProviderOrdersService } from "./provider-orders/provider-orders-list.service";
import { OrderHistoryComponent } from "./order-history/order-history-list/order-history.component";
import { OrderHistoryService } from "./order-history/order-history.service";

@NgModule({
    declarations: [
        ProviderOrdersListComponent,
        OrderHistoryComponent
    ],
    imports: [
        CommonModule,
        SharedAppModule,
        OrderRoutingModule,
        NgxDatatableModule,
        PrimeNgModule
    ],
    providers: [
        DatePipe,
        ProviderOrdersService,
        OrderHistoryService,
    ]
})
export class OrderModule {}