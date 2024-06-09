import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedAppModule } from "src/app/core/shared/shared.module";
import { ProviderRoutingModule } from "./provider-routing.module";
import { ProviderCategoriesComponent } from "./provider-categories/prov-categories.component";
import { ProviderCategoriesListService } from "./provider-categories/prov-categories.service";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrimeNgModule } from "../primeng.module";
import { ProductCategoriesComponent } from "./product-categories/product-categories.component";
import { ProductCategoriesService } from "./product-categories/product-categories.service";
import { ProviderListComponent } from "./provider-list/all-providers/provider-list.component";
import { ProviderListService } from "./provider-list/provider-list.service";
import { ProviderviewSetListComponent } from "./provider-viewSet/all-provider-viewSet/provider-viewSet.component";
import { ProviderViewSetListService } from "./provider-viewSet/provider-viewSet.service";
import { ProviderBranchService } from "./provider-branch/provider-branch.service";
import { ProviderBranchComponent } from "./provider-branch/all-provider-branch/provider-branch.component";
import { GetByIdProviderBranchComponent } from "./provider-branch/getById-provider-branch/getById-provider-branch.component";
import { GetByIdProviderComponent } from "./provider-list/getById-provider/getById-provider.component";
import { GetByIdProviderViewSetComponent } from "./provider-viewSet/getById-provider-viewSet/getById-provider-viewSet.component";

@NgModule({
    declarations: [
        ProviderCategoriesComponent,
        ProductCategoriesComponent,
        ProviderListComponent,
        ProviderviewSetListComponent,
        ProviderBranchComponent,
        GetByIdProviderBranchComponent,
        GetByIdProviderComponent,
        GetByIdProviderViewSetComponent,
    ],
    imports: [
        CommonModule,
        SharedAppModule,
        ProviderRoutingModule,
        NgxDatatableModule,
        PrimeNgModule
    ],
    providers: [
        ProviderCategoriesListService,
        ProductCategoriesService,
        ProviderListService,
        ProviderViewSetListService,
        ProviderBranchService
    ]
})
export class ProviderModule {}