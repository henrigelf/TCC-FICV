import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the LocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local',
  templateUrl: 'local.html',
})
export class LocalPage {
  public form: FormGroup;
  public nomeLocal: any;
  public enderecoLocal: any;
  public numeroLocal: any;
  public bairroLocal: any;
  public ufLocal: any;
  public cidadeLocal: any;
  public cepLocal: any;
  public paisLocal: any;
  public tipoLocal: any = 1;
  public isEdited: boolean = false;
  public pageTitle: string;

  public hideForm: boolean = false;
  public recordID: any = null;
  private baseURI: string = "http://127.0.0.1/TestePHPApi/";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController
  ) {

    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "nomeLocal": ["", Validators.required],
      "enderecoLocal": ["",],
      "numeroLocal": ["",],
      "bairroLocal": ["",],
      "ufLocal": ["",],
      "cidadeLocal": ["",],
      "cepLocal": ["",],
      "paisLocal": ["",],
      "tipoLocal": ["",]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalPage');
    if (this.navParams.get("paramlocal")) {
      console.log("Get = " + JSON.stringify(this.navParams.get("paramlocal")));
      this.isEdited = true;
      this.selectEntry(this.navParams.get("paramlocal"));
      this.pageTitle = 'Alterar local';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Local';
    }
  }

  selectEntry(itemLocal: any): void {
    this.nomeLocal = itemLocal.LOCAL_NOME;
    this.enderecoLocal = itemLocal.LOCAL_ENDERECO;
    this.numeroLocal = itemLocal.LOCAL_NUMERO;
    this.bairroLocal = itemLocal.LOCAL_BAIRRO;
    this.ufLocal = itemLocal.LOCAL_UF;
    this.cidadeLocal = itemLocal.LOCAL_CIDADE;
    this.cepLocal = itemLocal.LOCAL_CEP;
    this.paisLocal = itemLocal.LOCAL_PAIS;
    this.tipoLocal = itemLocal.LOCAL_TIPO;
    this.recordID = itemLocal.COD_LOCAL;
  }

  createEntry(
    nomeLocal: string,
    cepLocal: string,
    enderecoLocal: string,
    numeroLocal: string,
    bairroLocal: string,
    ufLocal: string,
    cidadeLocal: string,
    paisLocal: string,
    tipoLocal: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createEntry",
        "nomeLocal": nomeLocal,
        "cepLocal": cepLocal,
        "enderecoLocal": enderecoLocal,
        "numeroLocal": numeroLocal,
        "bairroLocal": bairroLocal,
        "ufLocal": ufLocal,
        "cidadeLocal": cidadeLocal,
        "paisLocal": paisLocal,
        "tipoLocal": tipoLocal
      },
      url: any = this.baseURI + "salva-edita-exclui-update-local.php";
    console.log("SALVAR LOCAL: " + JSON.stringify(options))
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela SALVAR LOCAL: foi adicionado com sucesso`);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! SALVAR LOCAL');
        });
  }

  updateEntry(
    nomeLocal: string,
    cepLocal: string,
    enderecoLocal: string,
    numeroLocal: string,
    bairroLocal: string,
    ufLocal: string,
    cidadeLocal: string,
    paisLocal: string,
    tipoLocal: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateEntry",
        "nomeLocal": nomeLocal,
        "cepLocal": cepLocal,
        "enderecoLocal": enderecoLocal,
        "numeroLocal": numeroLocal,
        "bairroLocal": bairroLocal,
        "ufLocal": ufLocal,
        "cidadeLocal": cidadeLocal,
        "paisLocal": paisLocal,
        "tipoLocal": tipoLocal,
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-local.php";

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
      options: any = { "key": "delete", "recordID": this.recordID },
      url: any = this.baseURI + "salva-edita-exclui-update-local.php";

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
      nomeLocal: string = this.form.controls["nomeLocal"].value,
      cepLocal: string = this.form.controls["cepLocal"].value,
      enderecoLocal: string = this.form.controls["enderecoLocal"].value,
      numeroLocal: string = this.form.controls["numeroLocal"].value,
      bairroLocal: string = this.form.controls["bairroLocal"].value,
      ufLocal: string = this.form.controls["ufLocal"].value,
      cidadeLocal: string = this.form.controls["cidadeLocal"].value,
      paisLocal: string = this.form.controls["paisLocal"].value,
      tipoLocal: string = this.form.controls["tipoLocal"].value;

    if (this.isEdited) {
      this.updateEntry(
        nomeLocal,
        cepLocal,
        enderecoLocal,
        numeroLocal,
        bairroLocal,
        ufLocal,
        cidadeLocal,
        paisLocal,
        tipoLocal
      );
    }
    else {
      this.createEntry(
        nomeLocal,
        cepLocal,
        enderecoLocal,
        numeroLocal,
        bairroLocal,
        ufLocal,
        cidadeLocal,
        paisLocal,
        tipoLocal
      );
    }
  }
 
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

}
