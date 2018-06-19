import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbastecimentoPage } from '../abastecimento/abastecimento';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ServicoabastecimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicoabastecimento',
  templateUrl: 'servicoabastecimento.html',
})
export class ServicoabastecimentoPage {
  public itemsAbastecimento: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad ServicoabastecimentoPage');
    this.load();
  }

  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_abastecimento.php')
      .subscribe((servicoAbastecimento: any) => {
        console.dir(servicoAbastecimento); 
        this.itemsAbastecimento = servicoAbastecimento;    
      },
        (error: any) => {
          console.dir(error);
        });
    }

  goAbastecimento() {
    this.navCtrl.push(AbastecimentoPage); 
  }
}
