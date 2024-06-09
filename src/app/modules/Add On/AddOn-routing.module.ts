import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { FAQComponent } from './faq/faq.component';
import { LocationComponent } from './location/location.component';
import { Offer_BannerComponent } from './offer-banner/offer-banner.component';
import { NotificationsComponent } from './notifications/all-notifications/notifications.component';
import { GetByIdNotificationComponent } from './notifications/getById-notification/getById-notification.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: 'slider', component: SliderComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'location', component: LocationComponent },
  { path: 'offerBanner', component: Offer_BannerComponent },
  { path: 'notification', component: NotificationsComponent },
  { path: 'notification/:id', component: GetByIdNotificationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddOnRoutingModule { }
