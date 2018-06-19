
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ManutencaoPopoverPage } from '../manutencao-popover/manutencao-popover';
import { DataPopoverPage } from '../data-popover/data-popover';
import { HomePage } from './../home/home';


/** 
 * Generated class for the ManutencaoveicularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manutencaoveicular',
  templateUrl: 'manutencaoveicular.html',
})
export class ManutencaoveicularPage {

  public dataFiltro: any;
  public timeFiltro: any;

  public mtVeiculo: any ; 
  public mtVeiculos: Array<any> = [];
  public mtOdometro: any;


  public mtTipoServicos: Array<any> = [];
  public mtTipoServico: any = null;
  public mtTipoServicoAux: any = 0;


  public mtTipoVrServicos: Array<any> = [];
  public mtTipoVrServico: any;

  public mtTipoVrServicoTotal: any = 0;


  public grupogastos: Array<any> = [];
  public grupogasto: any;

  public formapgtos: Array<any> = [];
  public formapgto: any;

  public mtQteParcela: any = 1;

  public locais: Array<any> = [];
  public local: any = 0;

  public descricao: any;


  public mtBtPago: any = false;


  public form: FormGroup;


  public codServico: any;

  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;

  private mtValorParcela: any;

  private baseURI: string = "http://127.0.0.1/TestePHPApi/";
  private date = new Date();

  public isEnabled = false;// desabilitar o campo quando for editar o serviço.

  private codParcServico: any = null;
  private idServico: any;
  private idUsuario: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    public fb: FormBuilder,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private storage: Storage
  ) {

    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({

      "dataManutencao": ["", Validators.required],
      "tempoManutencao": ["", Validators.required],

      "mtVeiculo": ["", Validators.required],
      "mtOdometro": ["", Validators.required],

      "mtTipoServico": ["", Validators.required],
      "mtTipoVrServico": ["", Validators.required],
      "mtTipoVrServicoTotal": ["",],

      "mtGpGasto": ["",Validators.required],

      "mtFormaPgto": ["", Validators.required],
      "mtQteParcela": ["",],

      "mtLocal": ["",],

      "mtDescricao": ["",],

      "mtBtPago": ["",]

    });
  }

  ionViewWillEnter(): void {
    //this.resetFields();

    if (this.navParams.get("paramdesp")) {
      console.log("Get = " + JSON.stringify(this.navParams.get("paramdesp")));
      this.isEdited = true;
      this.selectEntry(this.navParams.get("paramdesp"));
      this.pageTitle = 'Alterar Serviço';
      this.load();
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Serviço';
      //Pega a data atual
      this.dataFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
      //Pega o horário correto
      this.timeFiltro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
      this.load();
    }

  }
  //ALTEREI AQUI
  selectEntry(mtitem: any): void {

    this.recordID = mtitem.codigo;
    //RECEBE LOCAL
    this.http
      .get("http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbservicoeditservico.php?recordID=" + this.recordID)
      .subscribe((popularEditServico: any) => {
        // PARA POPULAR OS CAMPOS
        for (var i = 0; i <= popularEditServico.length - 1; i++) {
          let teste = popularEditServico[i].PARCELA_HORA;

          this.dataFiltro = popularEditServico[i].SERVICO_DATA.split('/').reverse().join('-');;
          this.timeFiltro = popularEditServico[i].PARCELA_HORA;

          this.mtVeiculo = popularEditServico[i].COD_VEICULO;
          this.mtOdometro = popularEditServico[i].SERVICO_ODOMETRO;

          this.mtTipoServicoAux = 1;

          this.mtTipoServicos[i] = {id:popularEditServico[i].COD_ITEMSERVICO, idCodParcServico:popularEditServico[i].COD_PARCSERVICO,idServico:popularEditServico[i].COD_TIPOSERVICO, nome: popularEditServico[i].TIP_SERVC_NOME, valor: popularEditServico[i].ITEMSERV_VALOR };
          this.mtTipoVrServicoTotal = popularEditServico[i].SERVICO_VRTOT;
          this.grupogasto = popularEditServico[i].COD_GRUPOGASTO;

          this.formapgto = popularEditServico[i].COD_FORMAPGTO;
          this.mtQteParcela = popularEditServico[i].SERVICO_QTETOTPARC;
          this.local = popularEditServico[i].COD_LOCAL;

          this.descricao = popularEditServico[i].SERVICO_OBS;
          this.mtBtPago = popularEditServico[i].PARCSERV_STATUS;

          console.dir("ooooooooooooooo: " + JSON.stringify(this.mtTipoServicos));
        }
        this.isEnabled = true;
        //this.locais = local;
      },
        (error: any) => {
          console.dir(error);
        });
    //console.log("RECORID= " + this.recordID)
  }
  /**
   * Salve um novo registro que foi adicionado ao formulário HTML da página
   * Use o método de postagem http do angular para enviar os dados do registro
   */
  //ALTEREI AQUI
  createEntry(dataManutencao: string,
    mtVeiculo: string,
    mtOdometro: string,
    mtTipoVrServicoTotal: string,
    mtQteParcela: string,
    mtLocal: string,
    mtDescricao: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "create",
        "dataManutencao": dataManutencao,
        "mtVeiculo": mtVeiculo,
        "mtOdometro": mtOdometro,
        "mtTipoVrServicoTotal": mtTipoVrServicoTotal,
        "mtQteParcela": mtQteParcela,
        "mtLocal": mtLocal,
        "mtDescricao": mtDescricao,
        "idUsuario": this.idUsuario
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";
    console.log("AQUIIII: " + JSON.stringify(options));  
    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela Serviço: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Ao salvar no serviço');
        });
  }

  salvarProduto(codServico: string,
    mtTipoServico: string,
    mtTipoVrServico: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createItemServico",
        "codServico": codServico,
        "mtTipoServico": mtTipoServico,
        "mtTipoVrServico": mtTipoVrServico,
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
       // this.sendNotification(`Parabéns pela Serviço: foi adicionado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Ao salvar no serviço');
        });
  }
  salvarParcela(codServico: string,
    dataPacManutencao: string,
    tempoManutencao: string,
    mtGpGasto: string,
    mtFormaPgto: string,
    numParcela: any,
    mtValorParcela: any,
    mtBtPago: string
  ): void {

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "createParcServico",
        "codServico": codServico,
        "dataPacManutencao": dataPacManutencao,
        "tempoManutencao": tempoManutencao,
        "mtGpGasto": mtGpGasto,
        "mtFormaPgto": mtFormaPgto,
        "numParcela": numParcela,
        "mtValorParcela": mtValorParcela,
        "mtBtPago": mtBtPago,
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela Serviço: foi adicionado com sucesso`);
        this.navCtrl.setRoot(HomePage); 
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Ao salvar no serviço');
        });
  }
  //========================================== UPDATE ====================================================================
  updateEntry(dataManutencao: string,
    mtVeiculo: string,
    mtOdometro: string,
    mtTipoVrServicoTotal: string,
    mtQteParcela: string,
    mtLocal: string,
    mtDescricao: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "update",
        "dataManutencao": dataManutencao,
        "mtVeiculo": mtVeiculo,
        "mtOdometro": mtOdometro,
        "mtTipoVrServicoTotal": mtTipoVrServicoTotal,
        "mtQteParcela": mtQteParcela,
        "mtLocal": mtLocal,
        "mtDescricao": mtDescricao,
        "recordID": this.recordID
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";
    //console.log("AQUIIII: " + JSON.stringify(options));      
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia foi atualizado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado!');
        });
  }

 updateProduto(codServico: any,
    idServico,
    mtTipoServico: string,
    mtTipoVrServico: string,
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateProduto",
        "codServico": codServico - 1,
        "idServico":idServico,
        "mtTipoServico": mtTipoServico,
        "mtTipoVrServico": mtTipoVrServico
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";
    //console.log("AQUIIII updateProduto: " + JSON.stringify(options));       
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia foi atualizado com sucesso`);

      },
        (error: any) => {
          this.sendNotification('Algo deu errado! No Update Produto');
        });
  }
  
  updateParcela(dataPacManutencao1: string,
    tempoManutencao1: string,
    mtGpGasto: string,
    numParcela: any,
    mtValorParcela: any,
    mtBtPago: string
  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "updateParcela",
        "dataPacManutencao1": dataPacManutencao1,
        "tempoManutencao1": tempoManutencao1,
        "mtGpGasto": mtGpGasto,
        "numParcela": numParcela,
        "mtValorParcela": mtValorParcela,
        "mtBtPago": mtBtPago,
        "codParcServico": this.codParcServico
      },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";
    //console.log("AQUIIII updateParcela: " + JSON.stringify(options));      
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        // Se a solicitação foi bem-sucedida, notifique o usuário
        //this.hideForm = true;
        //this.sendNotification(`Parabéns pela tecnologia foi atualizado com sucesso`);
        this.navCtrl.setRoot(HomePage); 
        
      },
        (error: any) => {
          this.sendNotification('Algo deu errado! Update parcela');
        });
  }
  //======================================== FIM UPDATE ===============================================================
  deleteEntry(): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { "key": "delete", "recordID": this.recordID },
      url: any = this.baseURI + "salva-edita-exclui-update-manutencao.php";

    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data => {
        this.hideForm = true;
        this.sendNotification(`Parabéns serviço foi excluído com sucesso`);
      },
        (error: any) => {
          this.sendNotification('Algo deu errado ao excluir o serviço!');
        });
  }

  saveEntry(): void {

    //==================================== CONVERTER NOME SERVIÇO PARA CODIGO DO SERIVÇO ==================================
    //let mtTipoServicoaux = (this.form.controls["mtTipoServico"].value).trim();
    //let idServico = this.mtTipoServicos.filter(function(x){return x.nome == mtTipoServicoaux})[0].servico;
    //==================================== FIM CONVERTER NOME SERVIÇO PARA CODIGO DO SERIVÇO  ==============================


    let dataManutencao: string = this.dataFiltro,
      mtVeiculo: string = this.form.controls["mtVeiculo"].value,
      mtOdometro: string = this.form.controls["mtOdometro"].value,
      mtGpGasto: string = this.form.controls["mtGpGasto"].value,
      
      //mtFormaPgto: string = this.form.controls["mtFormaPgto"].value,
      //Alterei aqui com o || qualquer problema só tirar 29/05/2018
      mtFormaPgto: string = (this.form.controls["mtQteParcela"].value =='' || this.form.controls["mtQteParcela"].value == 0)? '1': this.form.controls["mtQteParcela"].value,
      mtTipoVrServicoTotal: string = this.mtTipoVrServicoTotal,
      mtQteParcela: string = this.form.controls["mtQteParcela"].value,
      mtLocal: string = this.form.controls["mtLocal"].value,
      mtDescricao: string = this.form.controls["mtDescricao"].value == undefined ? '': this.form.controls["mtDescricao"].value;
      
      
        console.log("QQQQQQQQ: " + mtDescricao)
     
  
    if (this.isEdited) {
      //ALTEREI AQUI FAZER UPDATE
      this.updateEntry(dataManutencao,
        mtVeiculo,
        mtOdometro,
        mtTipoVrServicoTotal,
        mtQteParcela,
        mtLocal,
        mtDescricao
      );

      for (var i = 0; i <= this.mtTipoServicos.length - 1; i++) {// SE OS ITENS REPITIREM
        
        if(this.mtTipoServicos[i].idServico){
          this.mtTipoServico = this.mtTipoServicos[i].idServico;
        }else{
          this.mtTipoServico = this.mtTipoServicos[i].servico;
        }
        console.log()
        if(this.mtTipoServicos[i].id){
          this.idServico = this.mtTipoServicos[i].id;
        }else{
          this.idServico = '0';
        }
        let codServico: string = this.codServico,
            idServico: string = this.idServico,
            mtTipoServico: string = this.mtTipoServico,
            mtTipoVrServico: string = this.mtTipoServicos[i].valor;
            
        //console.log("item.idServico: " + this.mtTipoServicos[i].idServico + " item.Servico: " + this.mtTipoServicos[i].servico);
        //console.log("item.valor: " + this.mtTipoServicos[i].valor + " item.mtTipoVrServico: " +  this.form.controls["mtTipoVrServico"].value);
        //console.log("codServico: " + codServico);
        this.updateProduto(codServico,
          idServico,
          mtTipoServico,
          mtTipoVrServico,
        );
      }

      //TESTA SE QTE PARCELA MAIOR QUE 0
      if (this.mtQteParcela > 0) {
        this.mtValorParcela = (this.mtTipoVrServicoTotal / this.mtQteParcela);
      } else {
        this.mtValorParcela = this.mtTipoVrServicoTotal;
      }

      for (var parc = 1;parc <= this.mtQteParcela; parc++) {

        //data que vem  
        let
          today = this.dataFiltro,
          dataPacManutencao1 = new Date(new Date(today).setDate(new Date(today).getDate() + 30 * parc)).toISOString(),
          tempoManutencao1 = this.timeFiltro,
          mtGpGasto: string = this.form.controls["mtGpGasto"].value,
          numParcela: any = parc,
          mtValorParcela: any = this.mtValorParcela,
          mtBtPago: string = this.form.controls["mtBtPago"].value;
          
          if(parc == 1){
            this.codParcServico = this.mtTipoServicos.filter(function(x){return x.idCodParcServico;})[0].idCodParcServico;
          }else{
            this.codParcServico = (this.mtTipoServicos.filter(function(x){return x.idCodParcServico;})[0].idCodParcServico) + 1;
          }
         
          //console.log("AAAAAAAAAAAAAAAAAAAAAA: " + this.codParcServico);
         
        this.updateParcela(
          dataPacManutencao1,
          tempoManutencao1,
          mtGpGasto,
         // mtFormaPgto,
          numParcela,
          mtValorParcela,
          mtBtPago);

      }

    }
    else {
      //ALTEREI AQUI FAZER CREATE
      this.createEntry(dataManutencao,
        mtVeiculo,
        mtOdometro,
        mtTipoVrServicoTotal,
        mtQteParcela,
        mtLocal,
        mtDescricao,
      );

      for (var i = 0; i <= this.mtTipoServicos.length - 1; i++) {// SE OS ITENS REPITIREM
        let codServico: string = this.codServico,
          mtTipoServico: string = this.mtTipoServicos[i].servico,
          mtTipoVrServico: string = this.mtTipoServicos[i].valor;

        //console.log("item: " + this.mtTipoServicos[i].servico + " Valor: " + this.mtTipoServicos[i].valor);
        console.log("codServico: " + codServico);
        this.salvarProduto(codServico,
          mtTipoServico,
          mtTipoVrServico,
        );
      }
      //TESTA SE QTE PARCELA MAIOR QUE 0
      if (this.mtQteParcela > 0) {
        this.mtValorParcela = (this.mtTipoVrServicoTotal / this.mtQteParcela);
      } else {
        this.mtValorParcela = this.mtTipoVrServicoTotal;
      }
      console.log("QUANTIDADE PARCELA: " + this.mtQteParcela);
      for (var i = 1; i <= this.mtQteParcela; i++) {

        //data que vem  
        let codServico: string = this.codServico,
          today = this.dataFiltro,
          dataPacManutencao = new Date(new Date(today).setDate(new Date(today).getDate() + 30 * i)).toISOString(),
          tempoManutencao = this.timeFiltro,
          mtGpGasto: string = this.form.controls["mtGpGasto"].value,
          mtFormaPgto: string = this.form.controls["mtFormaPgto"].value,
          numParcela: any = i,
          mtValorParcela: any = this.mtValorParcela,
          mtBtPago: string = this.form.controls["mtBtPago"].value;

        this.salvarParcela(codServico,
          dataPacManutencao,
          tempoManutencao,
          mtGpGasto,
          mtFormaPgto,
          numParcela,
          mtValorParcela,
          mtBtPago);

      }

    }

    //}
  }
  resetFields(): void {

          this.dataFiltro = "";
          this.timeFiltro = "";

          //this.mtVeiculo = "";
          this.mtOdometro = "";

          this.mtTipoServicoAux = "";

          this.mtTipoVrServicoTotal = "";
          this.grupogasto = "";

          this.formapgto = "";
          this.mtQteParcela = "";
          this.local = "";

          this.descricao = "";
          this.mtBtPago = ""; 
  }
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
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
        this.mtVeiculos = veiculo; 
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
        //console.dir(local.length);
        this.locais = local;
        this.local = local.length;
      },
        (error: any) => {
          console.dir(error);
        });
    //RECEBE ultimo cod_servico cadastrado
    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbservico.php')
      .subscribe((codServico: any) => {
        //console.dir(codServico.Auto_increment);
        if (JSON.stringify(codServico.Auto_increment) == null) {
          this.codServico = 1;
          console.log("IF : " + this.codServico);
        } else {
          this.codServico = JSON.stringify(codServico.Auto_increment);
          console.log("ELSE : " + this.codServico);
        }
      },
        (error: any) => {
          console.dir(error);
        });
  }

  abrirPopover() {
    //ABRE O POPOVER
    let popover = this.popoverCtrl.create(ManutencaoPopoverPage);
    //RECUPERA OS DADOS INFORMADOS NO POPOVER
    popover.onDidDismiss(data => {
      if (data) {
        this.mtTipoServicos.push(data);
        this.mtTipoServicoAux = 1;
        this.mtTipoVrServicoTotal += parseFloat(data.valor);
      }
    });
    popover.present();
  }
  abrirPopoverData() {
    //VARIAVEL RECEBE NÚMERO COM O GRUPO DE GASTO
    let grupoGasto = this.grupogasto;
    //VARIAVEL grupoGastoNome - RECEBE O RETORNO DA FUNÇÃO - O QUE ESTÁ NA PRIMEIRA POSIÇÃO
    let grupoGastoNome = this.grupogastos.filter(function (x) { return x.COD_GRUPOGASTO == grupoGasto; })[0].GRUPGAST_NOME;

    let param = {
      data: this.dataFiltro,
      qte: this.mtQteParcela,
      grupoGasto: grupoGastoNome,
      total: this.mtTipoVrServicoTotal,
      formaPgto: this.mtBtPago
    };
    //ABRE O POPOVER 
    let popover = this.popoverCtrl.create(DataPopoverPage, { dataQte: param });
    //RECUPERA OS DADOS INFORMADOS NO POPOVER
    popover.onDidDismiss(data => {
      //this.mtTipoVrServico = data.valor;
      //this.mtTipoServico = data.servico;
      if (data) {
        this.mtTipoServicos.push(data);
        this.mtTipoServicoAux = 1;
        this.mtTipoVrServicoTotal += parseFloat(data.valor);
      }
    });
    popover.present();
  }


}
