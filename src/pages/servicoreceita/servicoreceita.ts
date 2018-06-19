import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DespesasPage } from '../despesas/despesas';

/**
 * Generated class for the ServicoreceitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicoreceita',
  templateUrl: 'servicoreceita.html',
})
export class ServicoreceitaPage {

  public servicoReceitas: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpClient) {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad ServicoreceitaPage');
    this.load();
  }

  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_receita.php')
      .subscribe((servicoReceita: any) => {
        console.dir(servicoReceita); 
        this.servicoReceitas = servicoReceita;    
      },
        (error: any) => {
          console.dir(error); 
        });
    }

  goReceita() { 
    this.navCtrl.push(DespesasPage); 
  }

}
