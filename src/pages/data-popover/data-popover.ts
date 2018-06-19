import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DataPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-popover',
  templateUrl: 'data-popover.html',
})
export class DataPopoverPage {
  
  public dataQteVr:any;

  public datas:  Array<any> = [];
  public data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //PEGANDO PARAMETRO dataQte
    this.dataQteVr = this.navParams.get("dataQte");
    console.log("OOOOLLALALA: " + JSON.stringify(this.dataQteVr));
  }

  ionViewWillEnter() {
    //console.log('ionViewDidLoad DataPopoverPage');
    this.criarData();
  }
  
  criarData(){
      
    for (var i = 1; i <= this.dataQteVr.qte; i++){
      //data que vem  
      let today  =  new Date(this.dataQteVr.data); 
      let data   =  new Date(new Date(today).setDate(new Date(today).getDate () + 30*i)).toLocaleString();
      let posicaoPgto = i;
      this.datas[i] = {dataDiv: data.substring(0,10),
        grupoGasto: this.dataQteVr.grupoGasto != 0 ? this.dataQteVr.grupoGasto : this.dataQteVr.grupoGanho, 
        total: this.dataQteVr.grupoGasto != 0 ? (this.dataQteVr.total/this.dataQteVr.qte):this.dataQteVr.total, 
        formaPgto: this.dataQteVr.formaPgto, 
        posicaoPgto: posicaoPgto, totalDivPgto: this.dataQteVr.qte}; 
     //console.log(this.datas[i] = [data]);  
    }
    console.log("OLHA; " + JSON.stringify(this.datas));
  }
  
  //Criando uma data sem parâmetros (tempo atual)


}
