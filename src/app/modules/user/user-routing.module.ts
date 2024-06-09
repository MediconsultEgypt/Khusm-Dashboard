import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateUsersComponent } from './user-create/create-user.component';
import { CreateClientUsersComponent } from './create-user-client/create-user-client.component';
import { GetUserOrdersComponent } from './user-orders/get-user-order.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'createUser', component: CreateUsersComponent },
  { path: 'createClient', component: CreateClientUsersComponent },
  { path: 'userOrder', component: GetUserOrdersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
