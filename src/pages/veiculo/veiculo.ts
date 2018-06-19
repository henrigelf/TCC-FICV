import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the VeiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {

  public form: FormGroup;

  public tipoVeiculo: any;

  public marcaVeiculos: Array<any> = [];
  public marcaVeiculo: any;

  public modeloVeiculos: Array<any> = [];
  public modeloVeiculo: any = null;

  public placaVeiculo: any;
  public anoVeiculo: any;
  public qteTanqueVeiculo: any = false;

  public tipoAbastecimentoVeiculos: Array<any> = [];
  public tipoAbastecimentoVeiculo: any = 1;

  public volumeTanqueVeiculo: any;

  public unidadeMedidaVeiculos: Array<any> = [];
  public unidadeMedidaVeiculo: any = 1;

  public chassiVeiculo: any;
  public renavamVeiculo: any;
  public obsVeiculo: any;
  private idUsuario: any;
  public statusVeiculo: any = true;

  public totOdometroVeiculo: any;

  public pageTitle: string;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public recordID: any = null;

  private baseURI: string = "http://127.0.0.1/TestePHPApi/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "tipoVeiculo": ["", Validators.required],
      "marcaVeiculo": ["", Validators.required],
      "modeloVeiculo": ["", Validators.required],
      "totOdometroVeiculo": ["", Validators.required],
      "placaVeiculo": ["",],
      "anoVeiculo": ["",],
      "qteTanqueVeiculo": ["",],
      "tipoAbastecimentoVeiculo": ["",],
      "volumeTanqueVeiculo": ["",],
      "unidadeMedidaVeiculo": ["",],
      "chassiVeiculo": ["",],
      "renavamVeiculo": ["",],
      "obsVeiculo": ["",],
      "statusVeiculo": ["",]

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeiculoPage');

    if (this.navParams.get("paramVeiculo")) {
      console.log("Get = " + JSON.stringify(this.navParams.get("paramVeiculo")));
      this.isEdited = true;
      this.selectEntry(this.navParams.get("paramVeiculo"));
      this.pageTitle = 'Alterar veiculo';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Veiculo';
    }

    this.load();
  }

  selectEntry(itemLocal: any): void {


    this.tipoVeiculo = itemLocal.VEIC_TIPO;
    this.marcaVeiculo = itemLocal.VEIC_MARCA;
    this.loadModelo();
    this.modeloVeiculo = itemLocal.COD_MODELO;
    this.totOdometroVeiculo = itemLocal.VEIC_ODOMETROTOT;
    this.placaVeiculo = itemLocal.VEIC_PLACA;

    this.anoVeiculo = itemLocal.VEIC_ANO;

    this.qteTanqueVeiculo = itemLocal.VEIC_QTETANQUE;

    this.tipoAbastecimentoVeiculo = itemLocal.COD_TIPOABASTECIMENTO;
    this.volumeTanqueVeiculo = itemLocal.VEIC_VOLUMETANQUE;
    this.unidadeMedidaVeiculo = itemLocal.COD_UNIDMEDVEIC;
    this.chassiVeiculo = itemLocal.VEIC_CHASSI;
    this.renavamVeiculo = itemLocal.VEIC_RENAVAM;
    this.obsVeiculo = itemLocal.VEIC_OBS;
    this.statusVeiculo = itemLocal.VEIC_STATUS;

    this.recordID = itemLocal.COD_VEICULO;
    
    
  }

  createEntry(
    tipoVeiculo: string,
    marcaVeiculo: string,
    modeloVeiculo: string,
    totOdometroVeiculo: string,
    placaVeiculo: string,
    anoVeiculo: string,
    qteTanqueVeiculo: string,
    tipoAbastecimentoVeiculo: string,
    volumeTanqueVeiculo: string,
    unidadeMedidaVeiculo: string,
    chassiVeiculo: string,
    renavamVeiculo: string,
    obsVeiculo: string,
    statusVeiculo: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createEntry",
        "tipoVeiculo": tipoVeiculo,
        "marcaVeiculo": marcaVeiculo,
        "modeloVeiculo": modeloVeiculo,
        "totOdometroVeiculo": totOdometroVeiculo,
        "placaVeiculo": placaVeiculo,
        "anoVeiculo": anoVeiculo,
        "qteTanqueVeiculo": qteTanqueVeiculo,
        "tipoAbastecimentoVeiculo": tipoAbastecimentoVeiculo,
        "volumeTanqueVeiculo": volumeTanqueVeiculo,
        "unidadeMedidaVeiculo": unidadeMedidaVeiculo,
        "chassiVeiculo": chassiVeiculo,
        "renavamVeiculo": renavamVeiculo,
        "obsVeiculo": obsVeiculo,
        "statusVeiculo": statusVeiculo,
        "idUsuario": this.idUsuario
      },
      url: any = this.baseURI + "salva-edita-exclui-update-veiculo.php";
    console.log("SALVAR VEÍCULO: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela SALVAR veiculo: foi adicionado com sucesso`);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! SALVAR LOCAL');
        });
  }

  updateEntryVeiculo(
    tipoVeiculo: string,
    marcaVeiculo: string,
    modeloVeiculo: string,
    totOdometroVeiculo: string,
    placaVeiculo: string,
    anoVeiculo: string,
    qteTanqueVeiculo: string,
    tipoAbastecimentoVeiculo: string,
    volumeTanqueVeiculo: string,
    unidadeMedidaVeiculo: string,
    chassiVeiculo: string,
    renavamVeiculo: string,
    obsVeiculo: string,
    statusVeiculo: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateEntryVeiculo",
        "tipoVeiculo": tipoVeiculo,
        "marcaVeiculo": marcaVeiculo,
        "modeloVeiculo": modeloVeiculo,
        "totOdometroVeiculo": totOdometroVeiculo,
        "placaVeiculo": placaVeiculo,
        "anoVeiculo": anoVeiculo,
        "qteTanqueVeiculo": qteTanqueVeiculo,
        "tipoAbastecimentoVeiculo": tipoAbastecimentoVeiculo,
        "volumeTanqueVeiculo": volumeTanqueVeiculo,
        "unidadeMedidaVeiculo": unidadeMedidaVeiculo,
        "chassiVeiculo": chassiVeiculo,
        "renavamVeiculo": renavamVeiculo,
        "obsVeiculo": obsVeiculo,
        "statusVeiculo": statusVeiculo,
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-veiculo.php";
      console.log("UPDATE VEÍCULO: " + JSON.stringify(options))
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela UPDATE: foi atualizado com sucesso`);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! UPDATE');
        });
  }

  deleteEntry(): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "deleteEntry", "recordID": this.recordID },
      url: any = this.baseURI + "salva-edita-exclui-update-veiculo.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        this.hideForm = true;
        this.sendNotification(`Parabéns pela DELETAR: foi excluído com sucesso`);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Ao Deletar.');
        });
  }

  saveEntry(): void {
    let
      tipoVeiculo: string = this.form.controls["tipoVeiculo"].value,
      marcaVeiculo: string = this.form.controls["marcaVeiculo"].value,
      modeloVeiculo: string = this.form.controls["modeloVeiculo"].value,
      totOdometroVeiculo: string = this.form.controls["totOdometroVeiculo"].value,
      placaVeiculo: string = this.form.controls["placaVeiculo"].value,
      anoVeiculo: string = this.form.controls["anoVeiculo"].value,
      qteTanqueVeiculo: string = this.form.controls["qteTanqueVeiculo"].value,
      tipoAbastecimentoVeiculo: string = this.form.controls["tipoAbastecimentoVeiculo"].value,
      volumeTanqueVeiculo: string = this.form.controls["volumeTanqueVeiculo"].value,
      unidadeMedidaVeiculo: string = this.form.controls["unidadeMedidaVeiculo"].value,
      chassiVeiculo: string = this.form.controls["chassiVeiculo"].value,
      renavamVeiculo: string = this.form.controls["renavamVeiculo"].value,
      obsVeiculo: string = this.form.controls["obsVeiculo"].value,
      statusVeiculo: string = this.form.controls["statusVeiculo"].value;

    if (this.isEdited) {
      this.updateEntryVeiculo(
        tipoVeiculo,
        marcaVeiculo,
        modeloVeiculo,
        totOdometroVeiculo,
        placaVeiculo,
        anoVeiculo,
        qteTanqueVeiculo,
        tipoAbastecimentoVeiculo,
        volumeTanqueVeiculo,
        unidadeMedidaVeiculo,
        chassiVeiculo,
        renavamVeiculo,
        obsVeiculo,
        statusVeiculo
      );
    }
    else {
      this.createEntry(
        tipoVeiculo,
        marcaVeiculo,
        modeloVeiculo,
        totOdometroVeiculo,
        placaVeiculo,
        anoVeiculo,
        qteTanqueVeiculo,
        tipoAbastecimentoVeiculo,
        volumeTanqueVeiculo,
        unidadeMedidaVeiculo,
        chassiVeiculo,
        renavamVeiculo,
        obsVeiculo,
        statusVeiculo
      );
    }
  }

  load(): void {

    this.storage.get("idUsuario").then((valor) => {
      this.idUsuario = JSON.stringify(valor[0].COD_USUARIO);
    });

    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbmarca.php')
      .subscribe((marca: any) => {
        console.dir(marca);
        this.marcaVeiculos = marca;
      },
        (error: any) => {
          console.dir(error);
        });



    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbtipoabastecimento.php')
      .subscribe((abastecimento: any) => {
        console.dir(abastecimento);
        this.tipoAbastecimentoVeiculos = abastecimento;
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbunidmedidaveiculo.php')
      .subscribe((unidadeMedida: any) => {
        console.dir(unidadeMedida);
        this.unidadeMedidaVeiculos = unidadeMedida;
      },
        (error: any) => {
          console.dir(error);
        });
  }
  loadModelo() {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbmodelo.php?marcaVeiculo=' + this.marcaVeiculo)
      .subscribe((modelo: any) => {
        console.dir(modelo);
        this.modeloVeiculos = modelo;
      },
        (error: any) => {
          console.dir(error);
        });
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

}
