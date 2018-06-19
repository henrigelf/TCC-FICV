import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { VeiculoPage } from '../veiculo/veiculo';

/**
 * Generated class for the ServicoveiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicoveiculo',
  templateUrl: 'servicoveiculo.html',
})
export class ServicoveiculoPage {

  public Veiculos: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  } 

  ionViewDidEnter() {
    //console.log('ionViewDidLoad ServicoveiculoPage');
    this.load();
  }
  load(): void {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliarServico/consult_servico_veiculo.php')
      .subscribe((servicoVeiculo: any) => {
        console.dir(servicoVeiculo); 
        this.Veiculos = servicoVeiculo;    
      },
        (error: any) => {
          console.dir(error);
        });
    }

  goVeiculo() {
    this.navCtrl.push(VeiculoPage); 
  }
  viewEntryLocal(paramVeiculo: any): void {
    console.log(paramVeiculo);
    this.navCtrl.push('VeiculoPage', paramVeiculo); 
  }
}
