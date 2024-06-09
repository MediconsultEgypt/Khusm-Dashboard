import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAllMethodComponent } from './user-all-method/all-users-method/user-all-method.component';
import { BrokerNameComponent } from './broker-name/all-broker-name/broker-name.component';
import { BrokerDealComponent } from './broker-deal/all-broker-deal/all-broker-deal.component';
import { MostVisitedComponent } from './most-visited/most-visited-list/most-visited.component';
import { ProviderCategoryComponent } from './provider-category/all-provider-category/all-provider-category.component';
import { ProviderAdminComponent } from './provider-admin/all-provider-admin/provider-admin.component';
import { ProviderProductComponent } from './provider-product/all-provider-product/provider-product.component';
import { ProvBranchComponent } from './provider-branch/all-p-branch/p-branch.component';
import { CategoryComponent } from './category/all-category/category.component';
import { ProviderRatesComponent } from './provider-rate/all-provider-rate/all-provider-rate.component';
import { PackageComponent } from './package/all-package/package.component';
import { PackagePromoCodeComponent } from './package-promo-code/all-package-promo-code/package-promo-code.component';
import { OrderPackageComponent } from './order-package/all-order-package/order-package.component';
import { OrderComponent } from './order/all-order/order.component';
import { UserPackageComponent } from './user-package/all-user-package/user-package.component';
import { OnlineOrderComponent } from './online-order/all-online-order/online-order.component';
import { FaqAdminComponent } from './faq-admin/all-faq-admin/faq-admin.component';
import { OfferBannerComponent } from './offer-banner/all-offer-banner/offer-banner.component';
import { GetByIdUserMethodComponent } from './user-all-method/getById-user-method/getById-user-method.component';
import { GetByIdBrokerNameComponent } from './broker-name/getById-broker-name/getById-broker-name.component';
import { GetByIdBrokerDealComponent } from './broker-deal/getById-broker-deal/getById-broker-deal.component';
import { GetByIdMostVisitedComponent } from './most-visited/getById-most-visited/getById-most-visited.component';
import { GetByIdProviderCategoryComponent } from './provider-category/getById-provider-category/getById-provider-category.component';
import { GetByIdProviderAdminComponent } from './provider-admin/getById-provider-admin/getById-provider-admin.component';
import { GetByIdProviderProductComponent } from './provider-product/getById-provider-product/getById-provider-product.component';
import { GetByIdProvBranchComponent } from './provider-branch/getById-prov-branch/getById-prov-branch.component';
import { GetByIdCategoryComponent } from './category/getById-category/getById-category.component';
import { GetByIdProviderRateComponent } from './provider-rate/getById-provider-rate/getById-provider-rate.component';
import { GetByIdPackageComponent } from './package/getById-package/getById-package.component';
import { GetByIdPackagePromoCodeComponent } from './package-promo-code/getById-package-promo-code/getById-package-promo-code.component';
import { GetByIdOrderPackageComponent } from './order-package/getById-order-package/getById-order-package.component';
import { GetByIdOrderComponent } from './order/getById-order/getById-order.component';
import { GetByIdUserPackageComponent } from './user-package/getById-user-package/getById-user-package.component';
import { GetByIdOnlineOrderComponent } from './online-order/getById-online-order/getById-online-order.component';
import { GetByIdFaqAdminComponent } from './faq-admin/getById-faq-admin/getById-faq-admin.component';
import { GetByIdOfferBannerComponent } from './offer-banner/getById-offer-banner/getById-offer-banner.component';
import { FamilyMemberAdminComponent } from './family-member-admin/all-family-member-admin/family-member-admin.component';
import { GetByIdFamilyMemberComponent } from './family-member-admin/getById-family-member/getById-family-member.component';

const routes: Routes = [
  { path: 'userMethod', component: UserAllMethodComponent },
  { path: 'userMethod/:id', component: GetByIdUserMethodComponent },
  { path: 'brokerName', component: BrokerNameComponent },
  { path: 'brokerName/:id:', component: GetByIdBrokerNameComponent },
  { path: 'brokerDeal', component: BrokerDealComponent },
  { path: 'brokerDeal/:id', component: GetByIdBrokerDealComponent },
  { path: 'mostVisited', component: MostVisitedComponent },
  { path: 'mostVisited/:id', component: GetByIdMostVisitedComponent },
  { path: 'provider-category', component: ProviderCategoryComponent },
  { path: 'provider-category/:id', component: GetByIdProviderCategoryComponent },
  { path: 'provider-admin', component: ProviderAdminComponent },
  { path: 'provider-admin/:id', component: GetByIdProviderAdminComponent },
  { path: 'provider-product', component: ProviderProductComponent },
  { path: 'provider-product/:id', component: GetByIdProviderProductComponent },
  { path: 'prov-branch', component: ProvBranchComponent },
  { path: 'prov-branch/:id', component: GetByIdProvBranchComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: GetByIdCategoryComponent },
  { path: 'prov-rate', component: ProviderRatesComponent },
  { path: 'prov-rate/:id', component: GetByIdProviderRateComponent },
  { path: 'package', component: PackageComponent },
  { path: 'package/:id', component: GetByIdPackageComponent },
  { path: 'package-promo-code', component: PackagePromoCodeComponent },
  { path: 'package-promo-code/:id', component: GetByIdPackagePromoCodeComponent },
  { path: 'order-package', component: OrderPackageComponent },
  { path: 'order-package/:id', component: GetByIdOrderPackageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:id', component: GetByIdOrderComponent },
  { path: 'user-package', component: UserPackageComponent },
  { path: 'user-package/:id', component: GetByIdUserPackageComponent },
  { path: 'online-order', component: OnlineOrderComponent },
  { path: 'online-order/:id', component: GetByIdOnlineOrderComponent },
  { path: 'faq-admin', component: FaqAdminComponent },
  { path: 'faq-admin/:id', component: GetByIdFaqAdminComponent },
  { path: 'offer-banner', component: OfferBannerComponent },
  { path: 'offer-banner/:id', component: GetByIdOfferBannerComponent },
  { path: 'family-member', component: FamilyMemberAdminComponent },
  { path: 'family-member/:id', component: GetByIdFamilyMemberComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewAdminPanelRoutingModule{}