import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the StoragePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
})
export class StoragePage {
  ultimoBotaoPressionado: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StoragePage');
    this.storage.get("idUsuario").then((valor) => {
      this.ultimoBotaoPressionado = JSON.stringify(valor[0].COD_USUARIO);
    });

  }

  botao1() {
    this.storage.set('ultimoBotaoPressionado', 1);
  }
  botao2() {
    this.storage.set('ultimoBotaoPressionado', 2);
  }

}
