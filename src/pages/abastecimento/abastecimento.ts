import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataPopoverPage } from '../data-popover/data-popover';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-abastecimento',
  templateUrl: 'abastecimento.html',
})
export class AbastecimentoPage {

  public dataFiltro: any;
  public timeFiltro: any;

  public form: FormGroup;
  public technologyName: any;
  public technologyDescription: any;
  public technologyDescriptionTeste: any;

  public abBtPago: any = false;

  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  public recordIDAbast: any = null;

  public codAbastecimento: any;

  private idItemAbastecimento: any;
  private idPacAbastecimento: any;

  private baseURI: string = "http://127.0.0.1/TestePHPApi/";

  //Variavel Henrique
  public veiculos: Array<any> = [];
  public veiculo: any;
  public kmVeiculo: Array<any> = [];
  public odometro: any;

  public tipoCombustivels: Array<any> = [];
  public tipoCombustivel: any;

  public abPrecoL: any;
  public abVrtotal: any;
  public abLitros: any;

  public formapgtos: Array<any> = [];
  public formapgto: any;

  public abQteParcela: any;
  public abCompletTanque: any = true;

  public locais: Array<any> = [];
  public local: any = 1;

  public grupogastos: Array<any> = [];
  public grupogasto: any;

  public obs: any = null;

  private idUsuario: any;

  date = new Date();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public storage: Storage
  ) {


    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "dataabastecimento": ["", Validators.required],
      "tempoAbastecimento": ["", Validators.required],
      "abVeiculo": ["", Validators.required],
      "abOdometro": ["", Validators.required],
      "abCombustivel": ["", Validators.required],
      "abPrecoL": ["", Validators.required],
      "abVrTotal": ["", Validators.required],
      "abLitros": ["", Validators.required],
      "abGpGasto": ["", Validators.required],
      "abFormaPgto": ["", Validators.required],
      "abQteParcela": ["",],
      "abCompletTanque": ["",],
      "abLocal": ["",],
      "abObs": ["",],
      "abBtPago": ["",]
    });

  }
  ionViewWillEnter(): void {
    //this.resetFields();

    if (this.navParams.get("paramdesp")) {
      console.log("Get = " + JSON.stringify(this.navParams.get("paramdesp")));
      this.isEdited = true;
      this.selectEntry(this.navParams.get("paramdesp"));
      this.pageTitle = 'Alterar abastecimento';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Abastecimento';
      //Pega a data atual
      this.dataFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
      //Pega o horário correto
      this.timeFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
    }
    this.load();
  }
  //ALTEREI AQUI 
  selectEntry(abitemAbastecimento: any): void {
    this.recordID = abitemAbastecimento.codigo;
    this.recordIDAbast = abitemAbastecimento.codigoAbast;
   
    if (abitemAbastecimento.servico == 'FUTURO') {
      this.http
        .get("http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbabastecimentoeditabastecimento.php?recordID=" + this.recordID + "&recordIDAbast=" + this.recordIDAbast)
        .subscribe((popularAbastecimento: any) => {
         
          this.idItemAbastecimento = popularAbastecimento[0].COD_ITEMABASTECIMENTO
          this.idPacAbastecimento = popularAbastecimento[0].COD_PARCABAST
          this.dataFiltro = popularAbastecimento[0].PARCABAST_DATA;
          this.timeFiltro = popularAbastecimento[0].PARCABAST_HORA;
          this.veiculo = popularAbastecimento[0].COD_VEICULO;
          this.odometro = popularAbastecimento[0].ABAST_ODOMETRO;
          this.tipoCombustivel = popularAbastecimento[0].COD_TIPOCOMBUSTIVEL;
          this.abPrecoL = popularAbastecimento[0].ITEMABAST_PRECO;
          this.abVrtotal = popularAbastecimento[0].ITEMABAST_VRTOTAL_ABAST;
          this.abLitros = popularAbastecimento[0].ITEMABAST_LITRO;
          this.formapgto = popularAbastecimento[0].COD_FORMAPGTO;
          this.abQteParcela = popularAbastecimento[0].ABAST_QTETOTPARC;
          this.abCompletTanque = popularAbastecimento[0].ABAST_TANQUECOMPLETO;
          this.local = popularAbastecimento[0].COD_LOCAL;
          this.grupogasto = popularAbastecimento[0].COD_GRUPOGASTO;
          this.obs = popularAbastecimento[0].ABAST_OBS;
          this.abBtPago = popularAbastecimento[0].PARCABAST_STATUS
          this.recordID = popularAbastecimento[0].COD_ABASTECIMENTO;

        },
          (error: any) => {
            console.dir(error);
          });
    }else {
      this.idItemAbastecimento = abitemAbastecimento.codigoItemAbast;
      this.idPacAbastecimento = abitemAbastecimento.codigoParcAbast;
      this.dataFiltro = abitemAbastecimento.data;
      this.timeFiltro = abitemAbastecimento.hora;
      this.veiculo = abitemAbastecimento.codigoVeiculo;
      this.odometro = abitemAbastecimento.odometro;
      this.tipoCombustivel = abitemAbastecimento.codigoTipCombustivel;
      this.abPrecoL = abitemAbastecimento.itemAbastPreco;
      this.abVrtotal = abitemAbastecimento.itemVrtotAbast;
      this.abLitros = abitemAbastecimento.itemLitro;

      this.formapgto = abitemAbastecimento.formaPgto;
      this.abQteParcela = abitemAbastecimento.qteTotParcela;
      this.abCompletTanque = abitemAbastecimento.tamqueCompleto;
      this.local = abitemAbastecimento.codLocal;
      this.grupogasto = abitemAbastecimento.codGrupo;
      this.obs = abitemAbastecimento.observacao;
      this.abBtPago = abitemAbastecimento.status
      this.recordID = abitemAbastecimento.codigo;
    }
    /*
    this.idItemAbastecimento = abitemAbastecimento.COD_ITEMABASTECIMENTO
    this.idPacAbastecimento = abitemAbastecimento.COD_PARCABAST
    this.dataFiltro = abitemAbastecimento.PARCABAST_DATA.split('/').reverse().join('-');
    this.timeFiltro = abitemAbastecimento.PARCABAST_HORA;
    this.veiculo = abitemAbastecimento.COD_VEICULO;
    this.odometro = abitemAbastecimento.ABAST_ODOMETRO;
    this.tipoCombustivel = abitemAbastecimento.COD_TIPOCOMBUSTIVEL;
    this.abPrecoL = abitemAbastecimento.ITEMABAST_PRECO;
    this.abVrtotal = abitemAbastecimento.ITEMABAST_VRTOTAL_ABAST;
    this.abLitros = abitemAbastecimento.ITEMABAST_LITRO;

    this.formapgto = abitemAbastecimento.COD_FORMAPGTO;
    this.abQteParcela = abitemAbastecimento.ABAST_QTETOTPARC;
    this.abCompletTanque = abitemAbastecimento.ABAST_TANQUECOMPLETO;
    this.local = abitemAbastecimento.COD_LOCAL;
    this.grupogasto = abitemAbastecimento.COD_GRUPOGASTO;
    this.obs = abitemAbastecimento.ABAST_OBS;
    this.abBtPago = abitemAbastecimento.PARCABAST_STATUS
    this.recordID = abitemAbastecimento.COD_ABASTECIMENTO;
    */
    //console.log("RECORID= " + this.recordID)
  }
  //ALTEREI AQUI
  createEntry(dataabastecimento: string,
    abVeiculo: string,
    abOdometro: string,
    abVrTotal: string,
    abQteTotParcela: string,
    abCompletTanque: string,
    abLocal: string,
    abObs: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createEntry",
        "dataabastecimento": dataabastecimento,
        "abVeiculo": abVeiculo,
        "abOdometro": abOdometro,
        "abVrTotal": abVrTotal,
        "abQteTotParcela": abQteTotParcela,
        "abCompletTanque": abCompletTanque,
        "abLocal": abLocal,
        "abObs": abObs,
        "abLitros": this.abLitros,
        "idUsuario": this.idUsuario
      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php?odometro=" + this.odometro + "&veiculo=" + this.veiculo;
    console.log("ENTRADA BASTECIMENTO: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! createEntry');
        });
  }
  salvarAbastecimento(
    codAbastecimento: string,
    abCombustivel: string,
    abPrecoL: string,
    abVrTotal: string,
    abLitros: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createItemAbastecimento",
        "codAbastecimento": codAbastecimento,
        "abCombustivel": abCombustivel,
        "abPrecoL": abPrecoL,
        "abVrTotal": abVrTotal,
        "abLitros": abLitros,

      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php";
    //console.log("Salvar ItemAbastecimento: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! salvarAbastecimento');
        });
  }

  salvarPacAbastecimento(
    codAbastecimento: string,
    dataabastecimento: string,
    tempoAbastecimento: string,
    abGpGasto: string,
    abFormaPgto: string,
    abNumParcela: string,
    abVrTotal: string,
    abBtPago: string

  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "salvarPacAbastecimento",
        "codAbastecimento": codAbastecimento,
        "dataabastecimento": dataabastecimento,
        "tempoAbastecimento": tempoAbastecimento,
        "abGpGasto": abGpGasto,
        "abFormaPgto": abFormaPgto,
        "abNumParcela": abNumParcela,
        "abVrTotal": abVrTotal,
        "abBtPago": abBtPago
      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php";
    //console.log("Salvar salvarPacAbastecimento: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Salvo!`);
        this.navCtrl.push(HomePage);
      },
        (error: any) => {
          this.sendNotification('Não salvo!');
        });
  }
  //========================================== UPDATE ====================================================================

  updateEntry(
    abVeiculo: string,
    abOdometro: string,
    abVrTotal: string,
    abCompletTanque: string,
    abLocal: string,
    abObs: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateEntry",
        "abVeiculo": abVeiculo,
        "abOdometro": abOdometro,
        "abVrTotal": abVrTotal,
        "abCompletTanque": abCompletTanque,
        "abLocal": abLocal,
        "abObs": abObs,
        "abLitros": this.abLitros,
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php?odometro=" + this.odometro + "&veiculo=" + this.veiculo;
    console.log("ENTRADA UPDATE PARTE 1: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia: foi adicionado com sucesso`);

      },
        (error: any) => {
          //console.log("ENTRADA UPDATE PARTE 1: " + JSON.stringify(error));
          this.sendNotification('Algo deu errado!');
        });
  }

  updatePacAbastecimento(

    dataabastecimento: string,
    tempoAbastecimento: string,
    abGpGasto: string,
    abVrTotal: string,
    abBtPago: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updatePacAbastecimento",
        "idPacAbastecimento": this.idPacAbastecimento,
        "dataabastecimento": dataabastecimento,
        "tempoAbastecimento": tempoAbastecimento,
        "abGpGasto": abGpGasto,
        "abVrTotal": abVrTotal,
        "abBtPago": abBtPago
      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php";
    console.log("ENTRADA UPDATE updatePacAbastecimento: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! updatePacAbastecimento');
        });
  }

  updateItemAbastecimento(

    abCombustivel: string,
    abPrecoL: string,
    abVrTotal: string,
    abLitros: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateItemAbastecimento",
        "idItemAbastecimento": this.idItemAbastecimento,
        "abCombustivel": abCombustivel,
        "abPrecoL": abPrecoL,
        "abVrTotal": abVrTotal,
        "abLitros": abLitros
      },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php";
    console.log("ENTRADA UPDATE updateItemAbastecimento: " + JSON.stringify(options));
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        this.sendNotification(`Deletado!`);
        this.navCtrl.push(HomePage);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! updatePacAbastecimento');
        });
  }
  //========================================== FIM UPDATE ====================================================================
  deleteEntry(): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "delete", "recordID": this.recordID },
      url: any = this.baseURI + "salva-edita-exclui-update-abastecimento.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        this.hideForm = true;
        this.sendNotification(`Salvo!`);
        this.navCtrl.push(HomePage);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! deleteEntry');
        });
  }
  saveEntry(): void {
    let dataabastecimento: string = this.form.controls["dataabastecimento"].value,
      tempoAbastecimento: string = this.form.controls["tempoAbastecimento"].value,

      codAbastecimento: string = this.codAbastecimento,
      abVeiculo: string = this.form.controls["abVeiculo"].value,
      abOdometro: string = this.form.controls["abOdometro"].value,
      abCombustivel: string = this.form.controls["abCombustivel"].value,
      abPrecoL: string = this.form.controls["abPrecoL"].value,
      abVrTotal: string = (this.form.controls["abFormaPgto"].value == 3 && this.form.controls["abQteParcela"].value > 1) ? (this.form.controls["abVrTotal"].value / this.form.controls["abQteParcela"].value) : this.form.controls["abVrTotal"].value,

      abLitros: string = this.form.controls["abLitros"].value,
      abFormaPgto: string = this.form.controls["abFormaPgto"].value,
      abQteTotParcela: string = (this.form.controls["abQteParcela"].value == '' || this.form.controls["abQteParcela"].value == 0) ? '1' : this.form.controls["abQteParcela"].value,
      abCompletTanque: string = this.form.controls["abCompletTanque"].value,
      abLocal: string = this.form.controls["abLocal"].value,
      abGpGasto: string = this.form.controls["abGpGasto"].value,
      abObs: string = this.form.controls["abObs"].value,
      abBtPago: string = this.form.controls["abBtPago"].value;

    this.abQteParcela = abQteTotParcela;
    //ALTEREI AQUI
    if (this.isEdited) {
      console.log("Estou editando");
      this.updateEntry(
        abVeiculo,
        abOdometro,
        abVrTotal,
        abCompletTanque,
        abLocal,
        abObs
      );

      this.updatePacAbastecimento(
        dataabastecimento,
        tempoAbastecimento,
        abGpGasto,
        abVrTotal,
        abBtPago
      );
      this.updateItemAbastecimento(
        abCombustivel,
        abPrecoL,
        abVrTotal,
        abLitros
      );


    }
    else {
      console.log("Estou no cadastro");
      //ALTEREI AQUI
      this.createEntry(dataabastecimento,
        abVeiculo,
        abOdometro,
        abVrTotal,
        abQteTotParcela,
        abCompletTanque,
        abLocal,
        abObs
      );


      this.salvarAbastecimento(
        codAbastecimento,
        abCombustivel,
        abPrecoL,
        abVrTotal,
        abLitros
      );
      for (var i = 1; i <= this.abQteParcela; i++) {
        let abNumParcela: any = i,
          today = this.dataFiltro,
          dataPacAbastecimento = this.formapgto == 3 ? new Date(new Date(today).setDate(new Date(today).getDate() + 30 * i)).toISOString() : today;

        this.salvarPacAbastecimento(
          codAbastecimento,
          dataPacAbastecimento,
          tempoAbastecimento,
          abGpGasto,
          abFormaPgto,
          abNumParcela,
          abVrTotal,
          abBtPago
        );
      }
    }

  }
  resetFields(): void {

    this.dataFiltro = "";
    this.timeFiltro = "";
    this.veiculo = "";
    this.odometro = "";
    this.tipoCombustivel = "";
    this.abPrecoL = "";
    this.abVrtotal = "";
    this.abLitros = "";
    this.formapgto = "";
    this.abQteParcela = "";
    this.abCompletTanque = "";
    this.local = "";
    this.grupogasto = "";
    this.obs = "";
    this.recordID = "";
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    notification.present();
  }

  load(): void {

    this.storage.get("idUsuario").then((valor) => {
      this.idUsuario = JSON.stringify(valor[0].COD_USUARIO);
    });

    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbveiculo.php')
      .subscribe((veiculo: any) => {
        console.dir(veiculo);
        this.veiculos = veiculo;
      },
        (error: any) => {
          console.dir(error);
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
    //RECEBE TIPO COMBUSTIVEL
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbtipocombustivel.php')
      .subscribe((tipoCombustivel: any) => {
        console.dir(tipoCombustivel);
        this.tipoCombustivels = tipoCombustivel;
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

    //RECEBE ultimo cod_servico cadastrado
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbabastecimento.php')
      .subscribe((codAbastecimento: any) => {
        //console.dir(codServico.Auto_increment);
        if (JSON.stringify(codAbastecimento.Auto_increment) == null) {
          this.codAbastecimento = 1;
          console.log("IF : " + this.codAbastecimento);
        } else {
          this.codAbastecimento = JSON.stringify(codAbastecimento.Auto_increment);
          console.log("ELSE : " + this.codAbastecimento);
        }
      },
        (error: any) => {
          console.dir(error);
        });

  }
  loadKm() {
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbveiculoKm.php?kmVeiculo=' + this.veiculo)
      .subscribe((km: any) => {
        console.dir(km);
        this.kmVeiculo = km;
      },
        (error: any) => {
          console.dir(error);
        });
  }
  abrirPopoverData() {

    //VARIAVEL RECEBE NÚMERO COM O GRUPO DE GASTO
    let grupoGasto = this.grupogasto;
    //VARIAVEL grupoGastoNome - RECEBE O RETORNO DA FUNÇÃO - O QUE ESTÁ NA PRIMEIRA POSIÇÃO
    let grupoGastoNome = this.grupogastos.filter(function (x) { return x.COD_GRUPOGASTO == grupoGasto; })[0].GRUPGAST_NOME;

    let param = {
      data: this.dataFiltro,
      qte: this.abQteParcela == 0 ? 1 : this.abQteParcela,
      grupoGasto: grupoGastoNome,
      total: this.abVrtotal,
      //formaPgto: this.mtBtPago
    };
    //ABRE O POPOVER
    let popover = this.popoverCtrl.create(DataPopoverPage, { dataQte: param });
    //RECUPERA OS DADOS INFORMADOS NO POPOVER
    popover.present();
  }

  CalcPrecoL() {

    if (this.abPrecoL && this.abLitros && !this.abVrtotal) {
      this.abVrtotal = (this.abPrecoL * this.abLitros).toFixed(3);
    }
    if (this.abPrecoL && this.abVrtotal && !this.abLitros) {
      this.abLitros = (this.abVrtotal / this.abPrecoL).toFixed(3);
    }
    if (this.abPrecoL && this.abVrtotal && this.abLitros) {
      this.abLitros = (this.abVrtotal / this.abPrecoL).toFixed(3);
    }

  }
  CalcVrTotal() {
    if (this.abVrtotal && this.abLitros && !this.abPrecoL) {
      this.abPrecoL = (this.abVrtotal / this.abLitros).toFixed(3);
    }
    if (this.abPrecoL && this.abVrtotal && this.abLitros) {
      this.abLitros = (this.abVrtotal / this.abPrecoL).toFixed(3);
    }
    if (this.abPrecoL && this.abVrtotal && !this.abLitros) {
      this.abLitros = (this.abVrtotal / this.abPrecoL).toFixed(3);
    }
  }
  CalcLitros() {
    if (this.abVrtotal && this.abLitros && !this.abPrecoL) {
      this.abPrecoL = (this.abVrtotal / this.abLitros).toFixed(3);
    }
    if (this.abPrecoL && this.abLitros && !this.abVrtotal) {
      this.abVrtotal = (this.abPrecoL * this.abLitros).toFixed(3);
    }
    if (this.abPrecoL && this.abVrtotal && this.abLitros) {
      this.abVrtotal = (this.abPrecoL * this.abLitros).toFixed(3);
    }
  }
}
