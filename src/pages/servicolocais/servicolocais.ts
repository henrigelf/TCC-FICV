import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LocalPage } from '../local/local';

/**
 * Generated class for the ServicolocaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicolocais',
  templateUrl: 'servicolocais.html',
})
export class ServicolocaisPage {

  public servicoLocais: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ServicolocaisPage');
    this.load();
  }
   
  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_local.php')
      .subscribe((servicoLocal: any) => {
        console.dir(servicoLocal); 
        this.servicoLocais = servicoLocal;    
      },
        (error: any) => {
          console.dir(error); 
        }); 
    }

  goLocal() { 
    this.navCtrl.push(LocalPage); 
  }

  viewEntryLocal(paramlocal: any): void {
    console.log(paramlocal);
    this.navCtrl.push('LocalPage', paramlocal);
  }
}
