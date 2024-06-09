import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedAppModule } from "src/app/core/shared/shared.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PrimeNgModule } from "../primeng.module";
import { BrokerRoutingModule } from "./broker-routing.module";
import { ActivateBrokerUserComponent } from "./activate-broker-user/activate-broker.component";
import { ActivateBrokerUserService } from "./activate-broker-user/activate-broker.service";
import { CreateBrokerUsersService } from "./create-broker-user/create-broker.service";
import { CreateBrokerComponent } from "./create-broker-user/create-broker.component";
import { PackageService } from "../new-admin-panel/package/package.service";

@NgModule({
    declarations: [
        ActivateBrokerUserComponent,
        CreateBrokerComponent
    ],
    imports: [
        CommonModule,
        SharedAppModule,
        BrokerRoutingModule,
        NgxDatatableModule,
        PrimeNgModule,
    ],
    providers: [
        ActivateBrokerUserService,
        CreateBrokerUsersService,
        PackageService
    ]
})
export class BrokerModule {}