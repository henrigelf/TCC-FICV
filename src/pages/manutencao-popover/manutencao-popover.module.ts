import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManutencaoPopoverPage } from './manutencao-popover';

@NgModule({
  declarations: [
    ManutencaoPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ManutencaoPopoverPage),
  ],
})
export class ManutencaoPopoverPageModule {}
