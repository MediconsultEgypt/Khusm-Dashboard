import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedAppModule } from "src/app/core/shared/shared.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrimeNgModule } from "../primeng.module";
import { NewAdminPanelRoutingModule } from "./new-admin-panel-routing.module";
import { UserAllMethodComponent } from "./user-all-method/all-users-method/user-all-method.component";
import { UserMethodService } from "./user-all-method/user-all-method.service";
import { BrokerNameComponent } from "./broker-name/all-broker-name/broker-name.component";
import { BrokerNameService } from "./broker-name/broker-name.service";
import { BrokerDealComponent } from "./broker-deal/all-broker-deal/all-broker-deal.component";
import { BrokerDealService } from "./broker-deal/broker-deal.serivce";
import { MostVisitedComponent } from "./most-visited/most-visited-list/most-visited.component";
import { MostVisitedService } from "./most-visited/most-visited.service";
import { ProviderCategoryService } from "./provider-category/all-provider-category.service";
import { ProviderCategoryComponent } from "./provider-category/all-provider-category/all-provider-category.component";
import { ProviderAdminComponent } from "./provider-admin/all-provider-admin/provider-admin.component";
import { ProviderAdminService } from "./provider-admin/provider-admin.service";
import { ProviderProductComponent } from "./provider-product/all-provider-product/provider-product.component";
import { ProviderProductService } from "./provider-product/provider-product.service";
import { ProvBranchComponent } from "./provider-branch/all-p-branch/p-branch.component";
import { ProvBranchService } from "./provider-branch/all-p-branch/p-branch.service";
import { CategoryService } from "./category/category.service";
import { CategoryComponent } from "./category/all-category/category.component";
import { ProviderRatesComponent } from "./provider-rate/all-provider-rate/all-provider-rate.component";
import { ProviderRateService } from "./provider-rate/provider-rate.service";
import { PackageComponent } from "./package/all-package/package.component";
import { PackageService } from "./package/package.service";
import { PackagePromoCodeComponent } from "./package-promo-code/all-package-promo-code/package-promo-code.component";
import { PackagePromoCodeService } from "./package-promo-code/package-promo-code.service";
import { OrderPackageComponent } from "./order-package/all-order-package/order-package.component";
import { OrderPackageService } from "./order-package/order-package.service";
import { OrderComponent } from "./order/all-order/order.component";
import { OrderService } from "./order/order.service";
import { UserPackageComponent } from "./user-package/all-user-package/user-package.component";
import { UserPackageService } from "./user-package/user-package.service";
import { OnlineOrderComponent } from "./online-order/all-online-order/online-order.component";
import { OnlineOrderService } from "./online-order/online-order.service";
import { FaqAdminComponent } from "./faq-admin/all-faq-admin/faq-admin.component";
import { FaqAdminService } from "./faq-admin/faq-admin.sevice";
import { OfferBannerComponent } from "./offer-banner/all-offer-banner/offer-banner.component";
import { OfferBannerService } from "./offer-banner/offer-banner.service";
import { GetByIdUserMethodComponent } from "./user-all-method/getById-user-method/getById-user-method.component";
import { GetByIdBrokerNameComponent } from "./broker-name/getById-broker-name/getById-broker-name.component";
import { GetByIdBrokerDealComponent } from "./broker-deal/getById-broker-deal/getById-broker-deal.component";
import { GetByIdMostVisitedComponent } from "./most-visited/getById-most-visited/getById-most-visited.component";
import { GetByIdProviderCategoryComponent } from "./provider-category/getById-provider-category/getById-provider-category.component";
import { GetByIdProviderAdminComponent } from "./provider-admin/getById-provider-admin/getById-provider-admin.component";
import { GetByIdProviderProductComponent } from "./provider-product/getById-provider-product/getById-provider-product.component";
import { GetByIdProvBranchComponent } from "./provider-branch/getById-prov-branch/getById-prov-branch.component";
import { GetByIdCategoryComponent } from "./category/getById-category/getById-category.component";
import { GetByIdProviderRateComponent } from "./provider-rate/getById-provider-rate/getById-provider-rate.component";
import { GetByIdPackageComponent } from "./package/getById-package/getById-package.component";
import { GetByIdPackagePromoCodeComponent } from "./package-promo-code/getById-package-promo-code/getById-package-promo-code.component";
import { GetByIdOrderPackageComponent } from "./order-package/getById-order-package/getById-order-package.component";
import { GetByIdOrderComponent } from "./order/getById-order/getById-order.component";
import { GetByIdUserPackageComponent } from "./user-package/getById-user-package/getById-user-package.component";
import { GetByIdOnlineOrderComponent } from "./online-order/getById-online-order/getById-online-order.component";
import { GetByIdFaqAdminComponent } from "./faq-admin/getById-faq-admin/getById-faq-admin.component";
import { GetByIdOfferBannerComponent } from "./offer-banner/getById-offer-banner/getById-offer-banner.component";
import { FamilyMemberAdminService } from "./family-member-admin/family-member-admin.service";
import { FamilyMemberAdminComponent } from "./family-member-admin/all-family-member-admin/family-member-admin.component";
import { GetByIdFamilyMemberComponent } from "./family-member-admin/getById-family-member/getById-family-member.component";

@NgModule({
    declarations: [
        UserAllMethodComponent,
        BrokerNameComponent,
        BrokerDealComponent,
        MostVisitedComponent,
        ProviderCategoryComponent,
        ProviderAdminComponent,
        ProviderProductComponent,
        ProvBranchComponent,
        CategoryComponent,
        ProviderRatesComponent,
        PackageComponent,
        PackagePromoCodeComponent,
        OrderPackageComponent,
        OrderComponent,
        UserPackageComponent,
        OnlineOrderComponent,
        FaqAdminComponent,
        OfferBannerComponent,
        GetByIdUserMethodComponent,
        GetByIdBrokerNameComponent,
        GetByIdBrokerDealComponent,
        GetByIdMostVisitedComponent,
        GetByIdProviderCategoryComponent,
        GetByIdProviderAdminComponent,
        GetByIdProviderProductComponent,
        GetByIdProvBranchComponent,
        GetByIdCategoryComponent,
        GetByIdProviderRateComponent,
        GetByIdPackageComponent,
        GetByIdPackagePromoCodeComponent,
        GetByIdOrderPackageComponent,
        GetByIdOrderComponent,
        GetByIdUserPackageComponent,
        GetByIdOnlineOrderComponent,
        GetByIdFaqAdminComponent,
        GetByIdOfferBannerComponent,
        FamilyMemberAdminComponent,
        GetByIdFamilyMemberComponent
        
    ],
    imports: [
        CommonModule,
        SharedAppModule,
        NewAdminPanelRoutingModule,
        NgxDatatableModule,
        PrimeNgModule
    ],
    providers: [
        DatePipe,
        UserMethodService,
        BrokerNameService,
        BrokerDealService,
        MostVisitedService,
        ProviderCategoryService,
        ProviderAdminService,
        ProviderProductService,
        ProvBranchService,
        CategoryService,
        ProviderRateService,
        PackageService,
        PackagePromoCodeService,
        OrderPackageService,
        OrderService,
        UserPackageService,
        OnlineOrderService,
        FaqAdminService,
        OfferBannerService,
        FamilyMemberAdminService
    ]
})
export class NewAdminPanelModule {}