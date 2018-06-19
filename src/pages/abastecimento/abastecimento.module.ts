import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbastecimentoPage } from './abastecimento';

@NgModule({
  declarations: [
    AbastecimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(AbastecimentoPage),
  ],
})
export class AbastecimentoPageModule {}
