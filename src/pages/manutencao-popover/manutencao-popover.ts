import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-manutencao-popover',
  templateUrl: 'manutencao-popover.html',
})
export class ManutencaoPopoverPage {

  public mtPopServico: any;
  public mtPopVrGasto: any;

  public tipoServicos: Array<any> = [];
  public tipoServico: any = null;


  public form: FormGroup;
  public technologyName: any;
  public technologyDescription: any;
  public technologyDescriptionTeste: any;



  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;


  date = new Date();

  constructor(public navCtrl: NavController,
    public viewCtrl:ViewController,
    public navParams: NavParams,
    public http: HttpClient,
    public fb: FormBuilder,
    public toastCtrl: ToastController) {

    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "mtPopVrGasto": ["", Validators.required],
      "mtPopServico": ["", Validators.required],
    });
  }

  ionViewWillEnter(): void {
  
    this.load(); 
  } 
  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }
  //BOTÃO PARA SALVAR
  btSalvar(){
    //VARIAVEL RECEBE VALOR DO TIPOSERVICO
    let servico = this.tipoServico;
    //VARIAVEL NOME SERV - RECEBE O RETORNO DA FUNÇÃO O QUE ESTÁ NA PRIMEIRA POSIÇÃO
    let nomeServ = this.tipoServicos.filter(function(x){return x.COD_TIPOSERVICO == servico;})[0].TIP_SERVC_NOME;
    //console.log("ESTOU NO POPOVER" + nomeServ);
    //PASSA POR PARAMETRO O SERVICO, NOME E VALOR
    let param={servico:this.tipoServico, nome: nomeServ, valor:this.mtPopVrGasto};
    //APÓS CLICAR EM SALVAR FECHA A TELA E PASSA O PARAMETRO
    this.viewCtrl.dismiss(param);
  }
  //BOTÃO CANCELAR
  btCancelar(){  
    this.viewCtrl.dismiss();
  }
  load(): void {
    this.http 
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbtiposervico.php')
      .subscribe((tipoServico: any) => {
        console.dir(tipoServico);
        this.tipoServicos = tipoServico;
      },
        (error: any) => {
          console.dir(error);
        }); 
  } 
}
