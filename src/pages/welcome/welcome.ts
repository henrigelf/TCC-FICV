import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public email: any;
  private baseURI: string = "http://127.0.0.1/TestePHPApi/";
  private tamanhoLogin: Array<any> = [];

  private contLogado: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public http: HttpClient,
    public toastCtrl: ToastController
  ) {
  }

  ionViewWillEnter() {


    this.storage.get('idContLogado').then((name) => {

     let contLogado = name;
      if (contLogado == true) {
        this.storage.get("idUsuario").then((valor) => {
          this.checkLogin(valor[0].USUARIO_EMAIL, valor[0].USUARIO_SENHA);
        });
      }
    });


  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  signup() {
    this.navCtrl.push(SignupPage, { email: this.email });
    console.log(this.email);
  }
  checkLogin(
    logName: string,
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
          this.storage.set('idUsuario', retornoLogin);
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
