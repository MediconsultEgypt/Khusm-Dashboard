import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainHeaderComponent } from './main-header.component';
import { PrimeNgModule } from 'src/app/modules/primeng.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PrimeNgModule
  ],
  declarations: [
    MainHeaderComponent
  ],
  exports: [
    MainHeaderComponent
  ]
})
export class MainHeaderModule {
}
