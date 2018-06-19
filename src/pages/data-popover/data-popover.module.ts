import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataPopoverPage } from './data-popover';

@NgModule({
  declarations: [
    DataPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(DataPopoverPage),
  ],
})
export class DataPopoverPageModule {}
