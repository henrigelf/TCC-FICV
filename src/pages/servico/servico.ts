import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicoabastecimentoPage } from '../servicoabastecimento/servicoabastecimento';
import { ServicocalculadoraflexPage } from '../servicocalculadoraflex/servicocalculadoraflex';
import { ServicodespesaPage } from '../servicodespesa/servicodespesa';
import { ServicolocaisPage } from '../servicolocais/servicolocais';
import { ServicomanutencaoPage } from '../servicomanutencao/servicomanutencao';
import { ServicoreceitaPage } from '../servicoreceita/servicoreceita';
import { ServicoveiculoPage } from '../servicoveiculo/servicoveiculo';

/**
 * Generated class for the ServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servico',
  templateUrl: 'servico.html',
})
export class ServicoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicoPage');
  }

  goServicoAbastecimento() {
    this.navCtrl.push(ServicoabastecimentoPage);
  }
  goServicoCalculadoraFlexPage() {
    this.navCtrl.push(ServicocalculadoraflexPage);
  }
  goServicoDespesa() {
    this.navCtrl.push(ServicodespesaPage);
  }
  goServicoLocais() {
    this.navCtrl.push(ServicolocaisPage);
  }
  goServicoManutencao() {
    this.navCtrl.push(ServicomanutencaoPage);
  }
  goServicoReceita() {
    this.navCtrl.push(ServicoreceitaPage);
  }
  goServicoVeiculo() {
    this.navCtrl.push(ServicoveiculoPage);
  }
}
