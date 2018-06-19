import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ManutencaoveicularPage } from '../manutencaoveicular/manutencaoveicular';

/**
 * Generated class for the ServicomanutencaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicomanutencao',
  templateUrl: 'servicomanutencao.html',
})
export class ServicomanutencaoPage {

  public servicoManutencoes: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad ServicomanutencaoPage');
    this.load();
  }

  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_manutencao.php')
      .subscribe((servicoManutencao: any) => {
        console.dir(servicoManutencao); 
        this.servicoManutencoes = servicoManutencao;    
      },
        (error: any) => {
          console.dir(error);
        });
    }

  goManutencao() { 
    this.navCtrl.push(ManutencaoveicularPage); 
  }

}
