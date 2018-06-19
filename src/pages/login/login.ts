import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public logName: any;
  public logSenha: any;

  public contLogado: any = false;

  private tamanhoLogin: Array<any> = [];

  public form: FormGroup;
  private baseURI: string = "http://127.0.0.1/TestePHPApi/";

  public hideForm: boolean = false;
  private idContLogado: any;

  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fb: FormBuilder,
    private storage: Storage

  ) {
    this.form = fb.group({
      "logName": ["", Validators.required],
      "logSenha": ["", Validators.required],
    });
  }

  ionViewDidEnter() {
    //console.log('ionViewDidLoad LoginPage');
    this.storage.get("idContLogado").then((valor) => {
      this.idContLogado = JSON.stringify(valor);
    });
    this.storage.get("idUsuario").then((valor) => {
      if (this.idContLogado == true) {
        this.checkLogin(valor[0].USUARIO_EMAIL, valor[0].USUARIO_SENHA);
      }
    });
  }
  login(): void {

    let logName: string = this.form.controls["logName"].value,
      logSenha: string = this.form.controls["logSenha"].value;
    this.checkLogin(logName,
      logSenha
    );
    //console.log("usuário: " + logName + "Senha: " + logSenha);
  }
  signup() {
    this.navCtrl.push(SignupPage);
  }

  checkLogin(logName: string,
    logSenha: string,

  ): void {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "key": "login",
        "logName": logName,
        "logSenha": logSenha,
      },
      url: any = this.baseURI + "salva-edita-exclui-update-login.php";
    this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe((retornoLogin: any) => {
        // Se a solicitação foi bem-sucedida, notifique o usuário

        this.tamanhoLogin = retornoLogin;
        if (this.tamanhoLogin.length > 0) {
          if (this.contLogado) {
            this.storage.set('idContLogado', this.contLogado);
            this.storage.set('idUsuario', retornoLogin);
          } else {
            this.storage.set('idContLogado', this.contLogado);
            this.storage.set('idUsuario', [{ COD_USUARIO: retornoLogin[0].COD_USUARIO }]);
          }
          this.navCtrl.push(TabsPage);
        } else {
          this.sendNotification(`E-mail ou senha incorreto!`);
          this.storage.clear();
        }
      },
        (error: any) => {
          this.sendNotification('Algo deu errado!');
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
