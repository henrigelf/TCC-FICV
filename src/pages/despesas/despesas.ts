import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPopoverPage } from '../data-popover/data-popover';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DespesasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despesas',
  templateUrl: 'despesas.html',
})
export class DespesasPage {

  public dataFiltro: any;
  public timeFiltro: any;

  public dpVrGasto: any;

  public dpBtGasto: any = false;
  public dpBtGanho: any = false;

  public grupogastos: Array<any> = [];
  public grupogasto: any;

  public grupoganhos: Array<any> = [];
  public grupoganho: any;

  public formapgtos: Array<any> = [];
  public formapgto: any;

  public locais: Array<any> = [];
  public local: any;

  public dpDescricao: any;

  public dpBtRepete: any = false;
  public dpBtPago: any = false;
  public dpBtRecebido: any = false;

  public dpQteParcela: any;

  public form: FormGroup;
  public technologyName: any;
  public technologyDescription: any;
  public technologyDescriptionTeste: any;

  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private idUsuario: any;

  private baseURI: string = "http://127.0.0.1/TestePHPApi/";
  date = new Date();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public storage: Storage
  ) {

    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({

      "dataDespesa": ["", Validators.required],
      "tempoDespesa": ["", Validators.required],
      "dpvrGasto": ["", Validators.required],
      "dpGasto": ["",],
      "dpGanho": ["",],

      "dpBtPago": ["",],
      "dpBtRepete": ["",],

      "dpGpGasto": ["",],
      "dpGpGanho": ["",],
      "dpFormaPgto": ["", Validators.required],
      "dpLocal": ["",],
      "dpDescricao": ["",],

      "dpRepete": ["",],
      "dpPago": ["",],
      "dpBtRecebido": ["",],
      "dpQteParcela": ["",]
    });
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.navParams.get("paramdesp")) {
      console.log("Get = " + JSON.stringify(this.navParams.get("paramdesp")));
      this.isEdited = true;
      this.selectEntryDesp(this.navParams.get("paramdesp"));
      this.pageTitle = 'Alterar saída'; 
    } else if (this.navParams.get("paramganho")) {
      console.log("Get2 = " + JSON.stringify(this.navParams.get("paramganho")));
      this.isEdited = true;
      this.selectEntryGanho(this.navParams.get("paramganho"));
      this.pageTitle = 'Alterar ganho';
    } else {
      this.isEdited = false;
      this.pageTitle = 'Despesa';
      //Pega a data atual
      this.dataFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
      //Pega o horário correto
      this.timeFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
    }
    this.load();
  }
  //ALTEREI AQUI
  //SELECTeNTRY GASTO
  selectEntryDesp(dpitemDesp: any): void {

    this.dataFiltro = dpitemDesp.data;
    this.timeFiltro = dpitemDesp.hora;
    this.dpVrGasto = dpitemDesp.valor;
    this.grupogasto = dpitemDesp.codGrupo;
    this.formapgto = dpitemDesp.formaPgto;
    this.local = dpitemDesp.codLocal;
    this.dpDescricao = dpitemDesp.observacao;
    this.dpBtRecebido = dpitemDesp.status;
    this.dpQteParcela = dpitemDesp.qteTotParcela;
    this.recordID = dpitemDesp.codigo;
    this.dpBtGanho = false;
    this.dpBtGasto = true;
  }
  //SELECTeNTRY GANHO
  selectEntryGanho(dpitemganho: any): void {

    this.dataFiltro = dpitemganho.GANHO_DATA.split('/').reverse().join('-');
    this.timeFiltro = dpitemganho.GANHO_HORA;
    this.dpVrGasto = dpitemganho.GANHO_VALOR;
    this.grupoganho = dpitemganho.COD_GRUPOGANHO;
    this.formapgto = dpitemganho.COD_FORMAPGTO;
    this.dpDescricao = dpitemganho.GANHO_OBS;
    this.dpBtRecebido = dpitemganho.GANHO_STATUS;
    this.dpQteParcela = dpitemganho.GANHO_QTEPARCELA;
    this.recordID = dpitemganho.COD_GANHO;

    this.dpBtGanho = true;
    this.dpBtGasto = false;

    console.log("RECORID ganho= " + this.recordID)
  }
  /**
   * Salve um novo registro que foi adicionado ao formulário HTML da página
   * Use o método de postagem http do angular para enviar os dados do registro
   */

  //INSERE O GASTO
  createEntryGasto(
    dataDespesa: string,
    tempoDespesa: string,
    dpvrGasto: string,
    dpGpGasto: string,
    dpFormaPgto: string,
    dpLocal: string,
    dpDescricao: string,
    dpQteTotParcela: string,
    dpNumParcela: string,
    dpBtRepete: string,
    dpBtPago: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createEntryGasto",
        "dataDespesa": dataDespesa,
        "tempoDespesa": tempoDespesa,
        "dpvrGasto": dpvrGasto,
        "dpGpGasto": dpGpGasto,
        "dpFormaPgto": dpFormaPgto,
        "dpLocal": dpLocal,
        "dpDescricao": dpDescricao,
        "dpQteTotParcela": dpQteTotParcela,
        "dpNumParcela": dpNumParcela,
        "dpBtRepete": dpBtRepete,
        "dpBtPago": dpBtPago,
        "idUsuario": this.idUsuario
      },
      url: any = this.baseURI + "salva-edita-exclui-update-despesa.php";
    console.log("CREAT GASTO" + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        this.sendNotification(`Parabéns pela Receita: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado!Receita');
        });
  }

  //INSERIR NO BD PARA GANHO - SALVAR COM GANHO
  createEntryGanho(
    dataDespesa: string,
    tempoDespesa: string,
    dpvrGasto: string,
    dpGpGanho: string,
    dpFormaPgto: string,
    dpDescricao: string,
    dpQteTotParcela: string,
    dpNumParcela: string,
    dpBtRepete: string,
    dpBtRecebido: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createEntryGanho",
        "dataDespesa": dataDespesa,
        "tempoDespesa": tempoDespesa,
        "dpvrGasto": dpvrGasto,
        "dpGpGanho": dpGpGanho,
        "dpFormaPgto": dpFormaPgto,
        "dpDescricao": dpDescricao,
        "dpQteTotParcela": dpQteTotParcela,
        "dpNumParcela": dpNumParcela,
        "dpBtRepete": dpBtRepete,
        "dpBtRecebido": dpBtRecebido,
        "idUsuario": this.idUsuario
      },
      url: any = this.baseURI + "salva-edita-exclui-update-receita.php";
    //console.log("CREAT GANHO" + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela Receita: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado!Receita');
        });
  }
  updateGasto(
    dataDespesa: string,
    tempoDespesa: string,
    dpvrGasto: string,
    dpGpGasto: string,
    dpFormaPgto: string,
    dpLocal: string,
    dpDescricao: string,
    dpPago: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateGasto",
        "dataDespesa": dataDespesa,
        "tempoDespesa": tempoDespesa,
        "dpvrGasto": dpvrGasto,
        "dpGpGasto": dpGpGasto,
        "dpFormaPgto": dpFormaPgto,
        "dpLocal": dpLocal,
        "dpDescricao": dpDescricao,
        "dpPago": dpPago, 
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-despesa.php";
      console.log("UPDATE GASTO" + JSON.stringify(options));
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela tecnologia foi atualizado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado!');
        });
  }

  //UPDATE GANHO
  updateGanho(
    dataDespesa: string,
    tempoDespesa: string,
    dpvrGasto: string,
    dpGpGanho: string,
    dpFormaPgto: string,
    dpDescricao: string,
    dpBtRecebido: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateGanho",
        "dataDespesa": dataDespesa,
        "tempoDespesa": tempoDespesa,
        "dpvrGasto": dpvrGasto,
        "dpGpGanho": dpGpGanho,
        "dpFormaPgto": dpFormaPgto,
        "dpDescricao": dpDescricao,
        "dpBtRecebido": dpBtRecebido,
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-receita.php";
      console.log("UPDATE GANHO: " + JSON.stringify(options));
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data1 => {
        // Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Parabéns pela tecnologia foi atualizado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Update Receita');
        });
  }

  deleteEntry(): void {

    if (this.dpBtGasto == true) {
      let 
        headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = { "key": "deleteGasto", "recordID": this.recordID },
        url: any = this.baseURI + "salva-edita-exclui-update-despesa.php";

      this.http
        .post(url, JSON.stringify(options), headers)
        .subscribe(data => {
          this.hideForm = true;
          this.sendNotification(`Parabéns pela tecnologia foi excluído com sucesso`);
        },
          (error: any) => {
            this.sendNotification('Algo deu errado!');
          });
    } else if (this.dpBtGanho == true) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = { "key": "deleteGanho", "recordID": this.recordID },
        url: any = this.baseURI + "salva-edita-exclui-update-receita.php";

      this.http
        .post(url, JSON.stringify(options), headers)
        .subscribe(data => {
          this.hideForm = true;
          this.sendNotification(`Parabéns pela tecnologia foi excluído com sucesso`);
        },
          (error: any) => {
            this.sendNotification('Algo deu errado!');
          });
    }
  }

  saveEntry(): void {
    let dataDespesa: string = this.form.controls["dataDespesa"].value,
      tempoDespesa: string = this.form.controls["tempoDespesa"].value,

      dpvrGasto: string = this.dpBtGasto == true && this.form.controls["dpQteParcela"].value > 1 ? (this.form.controls["dpvrGasto"].value / this.form.controls["dpQteParcela"].value) : this.form.controls["dpvrGasto"].value,

      dpGpGanho: string = this.form.controls["dpGpGanho"].value,

      dpFormaPgto: string = this.form.controls["dpFormaPgto"].value,
      dpDescricao: string = this.form.controls["dpDescricao"].value,

      dpQteTotParcela: string = (this.form.controls["dpQteParcela"].value == '' || this.form.controls["dpQteParcela"].value == 0) ? '1' : this.form.controls["dpQteParcela"].value,

      dpBtRepete: string = this.form.controls["dpBtRepete"].value,

      dpBtRecebido: string = this.form.controls["dpBtRecebido"].value,

      //GRUPO GASTO  
      dpGpGasto: string = this.form.controls["dpGpGasto"].value,
      dpLocal: string = this.form.controls["dpLocal"].value,
      dpBtPago: string = this.form.controls["dpBtPago"].value;

    this.dpQteParcela = dpQteTotParcela;

    if (this.isEdited) {
      //ALTEREI AQUI FAZER UPDATE
      if (this.dpBtGasto == true) {
        console.log("Estou no Gasto: " + dpvrGasto);
        this.updateGasto(
          dataDespesa,
          tempoDespesa,
          dpvrGasto,
          dpGpGasto,
          dpFormaPgto,
          dpLocal,
          dpDescricao,
          dpBtPago
        );
      } else if (this.dpBtGanho == true) {
        this.updateGanho(
         
          dataDespesa,
          tempoDespesa,
          dpvrGasto,
          dpGpGanho,
          dpFormaPgto,
          dpDescricao,
          dpBtRecebido,
        
        );
      }

    } else {
      //ALTEREI AQUI FAZER CREATE - PARA DESPESA
      if (this.dpBtGasto == true) {

        for (var i = 1; i <= this.dpQteParcela; i++) {

          let dpNumParcela: any = i;
          if (this.dpBtRepete == true) {
            let today = new Date(this.form.controls["dataDespesa"].value);
            let dataDespesa = new Date(new Date(today).setDate(new Date(today).getDate() + 30 * i)).toISOString();
          }
          console.log("ENtrei: " + i)
          console.log("dataDespesa: " + dataDespesa);
          console.log("tempoDespesa: " + tempoDespesa);
          console.log("dpvrGasto: " + dpvrGasto);
          console.log("dpGpGasto: " + dpGpGasto);
          console.log("dpFormaPgto: " + dpFormaPgto);
          console.log("dpLocal: " + dpLocal);
          console.log("dpDescricao: " + dpDescricao);
          console.log("dpQteTotParcela: " + dpQteTotParcela);
          console.log("dpNumParcela: " + dpNumParcela);
          console.log("dpBtRepete: " + dpBtRepete);
          console.log("dpBtPago: " + dpBtPago);

          this.createEntryGasto(dataDespesa,
            tempoDespesa,
            dpvrGasto,
            dpGpGasto,
            dpFormaPgto,
            dpLocal,
            dpDescricao,
            dpQteTotParcela,
            dpNumParcela,
            dpBtRepete,
            dpBtPago,
          );
        }
      }
      if (this.dpBtGanho == true) {
        for (var i = 1; i <= this.dpQteParcela; i++) {
          let dpNumParcela: any = i;
          if (this.dpBtRepete == true) {
            let today = new Date(this.form.controls["dataDespesa"].value);
            let dataDespesa = new Date(new Date(today).setDate(new Date(today).getDate() + 30 * i)).toISOString();
          }
          //ALTEREI AQUI FAZER CREATE - PARA GANHO
          //console.log("Entrei no ganho");
          this.createEntryGanho(dataDespesa,
            tempoDespesa,
            dpvrGasto,
            dpGpGanho,
            dpFormaPgto,
            dpDescricao,
            dpQteTotParcela,
            dpNumParcela,
            dpBtRepete,
            dpBtRecebido
          );
        }
      }
    }
  }
  resetFields(): void {

    this.dataFiltro = "";
    this.timeFiltro = "";
    this.formapgto = "";
    this.dpQteParcela = "";
    this.local = "";
    this.grupogasto = "";
    this.dpDescricao = "";
    this.recordID = "";
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  abrirPopoverData() {
    //RECEBE O VALOR DO GRUPO DO GASTO E GRUPO GANHO
    let grupoGanhoGasto = this.dpBtGasto == true ? this.grupogasto : this.grupoganho;
    //IF GRUPO GASTO SELECIONADO NOME GRUPO GASTO
    let grupoGastoNome = this.dpBtGasto == true ? this.grupogastos.filter(function (x) { return x.COD_GRUPOGASTO == grupoGanhoGasto; })[0].GRUPGAST_NOME : '0';
    //IF GRUPO GANHO SELECIONADO NOME GRUPO GANHO
    let grupoGanhoNome = this.dpBtGasto == true ? '0' : this.grupoganhos.filter(function (x) { return x.COD_GRUPOGANHO == grupoGanhoGasto; })[0].GRUP_GAN_NOME;

    let param = {
      data: this.dataFiltro,
      qte: this.dpQteParcela == 0 ? 1 : this.dpQteParcela,
      grupoGasto: grupoGastoNome,
      grupoGanho: grupoGanhoNome,
      total: this.dpVrGasto,
      //formaPgto: this.mtBtPago
    };
    //ABRE O POPOVER
    let popover = this.popoverCtrl.create(DataPopoverPage, { dataQte: param });
    //RECUPERA OS DADOS INFORMADOS NO POPOVER
    popover.present();
  }

  load(): void {

    this.storage.get("idUsuario").then((valor) => {
      this.idUsuario = JSON.stringify(valor[0].COD_USUARIO);
    });
    
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbformaPGTO.php')
      .subscribe((formapgto: any) => {
        console.dir(formapgto);
        this.formapgtos = formapgto;
      },
        (error: any) => {
          console.dir(error);
        });

    //RECEBE GRUPO DE GASTO
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbgrupogasto.php')
      .subscribe((grupogasto: any) => {
        console.dir(grupogasto);
        this.grupogastos = grupogasto;
      },
        (error: any) => {
          console.dir(error);
        });

    //RECEBE GRUPO DE GANHO
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbgrupoganho.php')
      .subscribe((grupoganho: any) => {
        console.dir(grupoganho);
        this.grupoganhos = grupoganho;
        //this.grupoganho = grupoganho.length; 
      },
        (error: any) => {
          console.dir(error);
        });

    //RECEBE LOCAL
    this.http
      .get('http://127.0.0.1/TestePHPApi/consult_tblocal.php')
      .subscribe((local: any) => {
        //console.dir(local);
        this.locais = local;
      },
        (error: any) => {
          console.dir(error);
        });
  }

  //VERIFICA SE A CHECKBOX GASTO ESTÁ MARCADA E DESABILITA A CHECKBOX GANHO
  checkboxGasto() {
    if (this.dpBtGasto) {
      //console.log("Gasto");
      this.dpBtGanho = false;

      this.grupoganho = "";
      this.formapgto = "";
      this.dpQteParcela = "";
      this.dpDescricao = "";
      this.dpBtRecebido = false;

    }
  }
  //VERIFICA SE A CHECKBOX GANO ESTÁ MARCADA E DESABILITA A CHECKBOX GASTO
  checkboxGanho() {
    if (this.dpBtGanho) {
      //console.log("Ganho");
      this.dpBtGasto = false;

      this.grupogasto = "";
      this.formapgto = "";
      this.dpQteParcela = "";
      this.dpDescricao = "";
      this.dpBtPago = false;
    }
  }
}
