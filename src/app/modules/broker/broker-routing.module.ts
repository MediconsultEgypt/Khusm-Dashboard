import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateBrokerUserComponent } from './activate-broker-user/activate-broker.component';
import { CreateBrokerComponent } from './create-broker-user/create-broker.component';

const routes: Routes = [
  { path: 'activateBroker', component: ActivateBrokerUserComponent },
  { path: 'create-broker', component: CreateBrokerComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrokerRoutingModule{}