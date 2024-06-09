import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderCategoriesComponent } from './provider-categories/prov-categories.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProviderListComponent } from './provider-list/all-providers/provider-list.component';
import { ProviderviewSetListComponent } from './provider-viewSet/all-provider-viewSet/provider-viewSet.component';
import { ProviderBranchComponent } from './provider-branch/all-provider-branch/provider-branch.component';
import { GetByIdProviderBranchComponent } from './provider-branch/getById-provider-branch/getById-provider-branch.component';
import { GetByIdProviderComponent } from './provider-list/getById-provider/getById-provider.component';
import { GetByIdProviderViewSetComponent } from './provider-viewSet/getById-provider-viewSet/getById-provider-viewSet.component';

const routes: Routes = [
  { path: 'provCategories', component: ProviderCategoriesComponent },
  { path: 'productCategories', component: ProductCategoriesComponent },  
  { path: 'providers', component: ProviderListComponent },
  { path: 'providers-viewSet', component: ProviderviewSetListComponent },
  { path: 'provider-branch', component: ProviderBranchComponent },
  { path: 'provider-branch/:id', component: GetByIdProviderBranchComponent},
  { path: 'providers/:id', component: GetByIdProviderComponent},
  { path: 'providers-viewSet/:id', component: GetByIdProviderViewSetComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProviderRoutingModule{}