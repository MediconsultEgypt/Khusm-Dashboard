import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../primeng.module';
import { AddOnRoutingModule } from './AddOn-routing.module';
import { SharedAppModule } from 'src/app/core/shared/shared.module';
import { SliderComponent } from './slider/slider.component';
import { SliderService } from './slider/slider.service';
import { FAQComponent } from './faq/faq.component';
import { FAQService } from './faq/faq.service';
import { LocationService } from './location/location.service';
import { LocationComponent } from './location/location.component';
import { Offer_BannerService } from './offer-banner/offer-banner.service';
import { Offer_BannerComponent } from './offer-banner/offer-banner.component';
import { NotificationService } from './notifications/notifications.service';
import { NotificationsComponent } from './notifications/all-notifications/notifications.component';
import { GetByIdNotificationComponent } from './notifications/getById-notification/getById-notification.component';

@NgModule({
  declarations: [
    SliderComponent,
    FAQComponent,
    LocationComponent,
    Offer_BannerComponent,
    NotificationsComponent,
    GetByIdNotificationComponent
  ],
  imports: [
    CommonModule,
    AddOnRoutingModule,
    SharedAppModule,
    PrimeNgModule
  ],
  providers: [
    SliderService,
    FAQService,
    LocationService,
    Offer_BannerService,
    NotificationService
  ]
})
export class AddOnModule { }
