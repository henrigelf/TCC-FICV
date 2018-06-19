
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ManutencaoveicularPage } from '../manutencaoveicular/manutencaoveicular';
//import { LembretePage } from '../lembrete/lembrete';
import { HttpClient } from '@angular/common/http';
import { AbastecimentoPage } from '../abastecimento/abastecimento';
import { DespesasPage } from '../despesas/despesas';
import { VeiculoPage } from '../veiculo/veiculo';
//import { WelcomePage } from '../welcome/welcome';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 

  public items: Array<any> = [];
  public locais: Array<any> = [];
  public homeDespesas: Array<any> = [];
  public homeReceitas: Array<any> = [];
  public homeFuturos: Array<any> = [];

  private recebTipo: Array<any> = [];

  private idUsuario: any;
  private date: any;
  
  @ViewChild('slider') slider: Slides;
  public page = 0;
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public app: App,
    private storage: Storage
  ) {

  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  movieButton($event) {
    this.page = $event._snapIndex.toString();
  }

  goAbastecimento() {
    this.navCtrl.push(AbastecimentoPage);
  }
  goDespesas() {
    this.navCtrl.push(DespesasPage);
  }
  goManutencaoVeicular() {
    this.navCtrl.push(ManutencaoveicularPage);
  }
  goServicoVeiculo() {
    this.navCtrl.push(VeiculoPage);
  }
  /*goLembrete(){
    this.navCtrl.push(LembretePage);
  }*/

  ionViewDidEnter(): void {
    this.load();
    this.date = new Date().toISOString();    
  }
  load(): void {
    this.storage.get("idUsuario").then((valor) => {
      this.idUsuario = JSON.stringify(valor[0].COD_USUARIO);
      console.log("teste henrique: " + this.idUsuario);
      //RECEBE LOCAL
      this.http
        .get('http://127.0.0.1/TestePHPApi/consult_tblocal.php?idUsuario=' + this.idUsuario)
        .subscribe((local: any) => {
          //console.dir(local);
          this.locais = local;
        },
          (error: any) => {
            console.dir(error);
          });

      this.http
        .get('http://127.0.0.1/TestePHPApi/consult_home_tudo.php?idUsuario=' + this.idUsuario)
        .subscribe((home: any) => {
          this.items = [];

          this.items = home;
          //PARA ORDENAR
          this.items = this.items.sort((b: any, a: any) => {
            return new Date(a.data + ' ' + a.hora).getTime() - new Date(b.data + ' ' + b.hora).getTime();
          });

          console.dir(this.items)
        },
          (error: any) => {
            console.dir(error);
          });
      //CONSULTA DESPESAS
      this.http
        .get('http://127.0.0.1/TestePHPApi/consult_home_despesa.php?idUsuario=' + this.idUsuario)
        .subscribe((despesa: any) => {

          this.homeDespesas = []

          this.homeDespesas = despesa;
          //PARA ORDERNAR
          this.homeDespesas = this.homeDespesas.sort((b: any, a: any) => {
            return new Date(a.data + ' ' + a.hora).getTime() - new Date(b.data + ' ' + b.hora).getTime();
          });

          console.dir(this.homeDespesas);
        },
          (error: any) => {
            console.dir(error);
          });

      //CONSULTA RECEITA
      this.http
        .get('http://127.0.0.1/TestePHPApi/consult_home_ganho.php?idUsuario=' + this.idUsuario)
        .subscribe((receita: any) => {
          console.dir(receita);
          this.homeReceitas = [];
          this.homeReceitas = receita;

          //PARA ORDERNAR
          this.homeReceitas = this.homeReceitas.sort((b: any, a: any) => {
            return new Date(a.data + ' ' + a.hora).getTime() - new Date(b.data + ' ' + b.hora).getTime();
          });

        },
          (error: any) => {
            console.dir(error);
          });

      //CONSULTA FUTURO
      this.http
        .get('http://127.0.0.1/TestePHPApi/consult_home_futuro.php?idUsuario=' + this.idUsuario + '&data=' + this.date)
        .subscribe((futuro: any) => {
          console.dir(futuro);
          this.homeFuturos = [];

          this.homeFuturos = futuro;

          //PARA ORDERNAR
          this.homeFuturos = this.homeFuturos.sort((b: any, a: any) => {
            return new Date(a.data + ' ' + a.hora).getTime() - new Date(b.data + ' ' + b.hora).getTime();
          });
        },
          (error: any) => {
            console.dir(error);
          });

    });//fim id

  }

  viewEntry(param: any): void {
    //console.log(param);
    this.navCtrl.push('ManutencaoveicularPage', param);
  }

  viewEntrydesp(paramdesp: any): void {
    this.recebTipo = [];

    this.recebTipo.push(paramdesp);

    console.log("PARAMETRO OOOOO: " + paramdesp);

    if(this.recebTipo[0].paramdesp.tipo == "ABASTECIMENTO")
    {
      this.navCtrl.push('AbastecimentoPage', paramdesp);
    }
    if(this.recebTipo[0].paramdesp.tipo == 'SERVICO')
    {
      this.navCtrl.push('ManutencaoveicularPage', paramdesp);
    }
    if(this.recebTipo[0].paramdesp.tipo == 'DESPESA')
    {
      this.navCtrl.push('DespesasPage', paramdesp);
    }

  }

  viewEntryganho(paramganho: any): void {
    console.log(paramganho);
    this.navCtrl.push('DespesasPage', paramganho);
  }


  logout() {
    const root = this.app.getRootNav();
    root.popToRoot();
    this.storage.clear();
  }


}
