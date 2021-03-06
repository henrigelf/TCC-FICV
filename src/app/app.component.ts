


import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




import { WelcomePage } from '../pages/welcome/welcome';
//import { DespesasPage } from '../pages/despesas/despesas';
//import { HomePage } from './../pages/home/home';
//import { VeiculoPage } from '../pages/veiculo/veiculo';

//import { ManutencaoveicularPage } from '../pages/manutencaoveicular/manutencaoveicular';

//import { ServicoPage } from '../pages/servico/servico';
//import { StoragePage } from '../pages/storage/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  rootPage:any = WelcomePage; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
