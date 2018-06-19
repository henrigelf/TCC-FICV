import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public form: FormGroup;
  public isEdited: boolean = false;
  public hideForm: boolean = false;

  public dataCadastro: any;
  public tempoCadastro: any;

  private date = new Date();

  private baseURI: string = "http://127.0.0.1/TestePHPApi/";

  email: any;
  numCel: any;
  senha: any;


  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    public fb: FormBuilder,
  ) {
    //PEGANDO PARAMETRO dataQte
    this.email = this.navParams.get("email");

    console.log("Tela singup: " + this.email);
    this.form = fb.group({

      "sigEmail": ["", Validators.compose([Validators.minLength(3), Validators.required])],
      "sigCelular": ["", Validators.compose([Validators.minLength(9), Validators.maxLength(12), Validators.required])],
      "sigSenha": ["", Validators.compose([Validators.minLength(8), Validators.required])]
    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.dataCadastro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
    //Pega o horário correto
    this.tempoCadastro = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString();
  }
  entrar() {
    this.navCtrl.push(LoginPage);
  }
  login() {
    this.navCtrl.push(LoginPage);
  }

  createEntry(
    dataCadastro: string,
    tempoCadastro: string,
    sigEmail: string,
    sigCelular: string,
    sigSenha: string,

  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "create",
        "dataCadastro": dataCadastro,
        "tempoCadastro": tempoCadastro,
        "sigEmail": sigEmail,
        "sigCelular": sigCelular,
        "sigSenha": sigSenha

      },
      url: any = this.baseURI + "salva-edita-exclui-update-login.php";

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // If the request was successful notify the user - Se a solicitação foi bem-sucedida, notifique o usuário
        this.hideForm = true;
        //this.sendNotification(`Parabéns pela Serviço: foi adicionado com sucesso`);
        console.log(`Parabéns pela cadastrar: foi adicionado com sucesso`);

      },
        (error: any) => {
          //this.sendNotification('Algo deu errado! Ao salvar no serviço');
          console.log('Algo deu errado! Ao salvar cadastrar')
        });
  }
  saveEntry(): void {
    console.log(this.dataCadastro)
    this.navCtrl.push(LoginPage);
    let dataCadastro: string = this.dataCadastro, 
        tempoCadastro: string = this.tempoCadastro,
        sigEmail: string = this.form.controls["sigEmail"].value,
        sigCelular: string = this.form.controls["sigCelular"].value,
        sigSenha: string = this.form.controls["sigSenha"].value;


    //console.log("Tipo Serviço: " + JSON.stringify(idServico));
    //ALTEREI AQUI FAZER CREATE
    this.createEntry( dataCadastro,
                      tempoCadastro,
                      sigEmail,
                      sigCelular,
                      sigSenha
    );
  }

}
