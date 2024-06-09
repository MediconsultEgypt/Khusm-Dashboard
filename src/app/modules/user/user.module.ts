import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedAppModule } from 'src/app/core/shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateUsersComponent } from './user-create/create-user.component';
import { CreateBulkUsersService } from './user-create/create-user.service';
import { CreateClientUsersComponent } from './create-user-client/create-user-client.component';
import { PackageService } from '../new-admin-panel/package/package.service';
import { PrimeNgModule } from '../primeng.module';
import { UserOrdersService } from './user-orders/get-user-order.service';
import { GetUserOrdersComponent } from './user-orders/get-user-order.component';

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    CreateUsersComponent,
    CreateClientUsersComponent,
    GetUserOrdersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedAppModule,
    PrimeNgModule
  ],
  providers: [
    CreateBulkUsersService,
    PackageService,
    UserOrdersService
  ]
})
export class UserModule { }
