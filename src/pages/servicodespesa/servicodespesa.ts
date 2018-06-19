import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DespesasPage } from '../despesas/despesas';

/**
 * Generated class for the ServicodespesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicodespesa',
  templateUrl: 'servicodespesa.html',
})
export class ServicodespesaPage {

  public despesas: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad ServicodespesaPage');
    this.load();
  }

  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_despesa.php')
      .subscribe((servicoDespesa: any) => {
        console.dir(servicoDespesa); 
        this.despesas = servicoDespesa;    
      },
        (error: any) => {
          console.dir(error);
        });
    }

  goDespesa() {
    this.navCtrl.push(DespesasPage); 
  }

}
