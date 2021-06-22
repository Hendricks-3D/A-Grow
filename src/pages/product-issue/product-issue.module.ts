import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductIssuePage } from './product-issue';

@NgModule({
  declarations: [
    ProductIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductIssuePage),
  ],
})
export class ProductIssuePageModule {}
