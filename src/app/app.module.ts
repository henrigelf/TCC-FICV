import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ResumoPageModule } from '../pages/resumo/resumo.module';
import { ServicoPageModule } from '../pages/servico/servico.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { WelcomePage } from '../pages/welcome/welcome';
import { AbastecimentoPageModule } from '../pages/abastecimento/abastecimento.module';
import { DespesasPageModule } from '../pages/despesas/despesas.module';
import { ManutencaoveicularPageModule } from '../pages/manutencaoveicular/manutencaoveicular.module';
import { ManutencaoPopoverPageModule } from '../pages/manutencao-popover/manutencao-popover.module';
import { DataPopoverPageModule } from '../pages/data-popover/data-popover.module';
import { ServicoabastecimentoPageModule } from '../pages/servicoabastecimento/servicoabastecimento.module';
import { ServicocalculadoraflexPageModule } from '../pages/servicocalculadoraflex/servicocalculadoraflex.module';
import { ServicodespesaPageModule } from '../pages/servicodespesa/servicodespesa.module';
import { ServicolocaisPageModule } from '../pages/servicolocais/servicolocais.module';
import { ServicomanutencaoPageModule } from '../pages/servicomanutencao/servicomanutencao.module';
import { ServicoreceitaPageModule } from '../pages/servicoreceita/servicoreceita.module';
import { LocalPageModule } from '../pages/local/local.module';
import { VeiculoPageModule } from '../pages/veiculo/veiculo.module';
import { ServicoveiculoPageModule } from '../pages/servicoveiculo/servicoveiculo.module';
import { StoragePageModule } from '../pages/storage/storage.module';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);


//import { AbastecimentoPage } from '../pages/abastecimento/abastecimento';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ResumoPageModule,
    ServicoPageModule,
    LoginPageModule,
    SignupPageModule,
    AbastecimentoPageModule,
    DespesasPageModule,
    ManutencaoveicularPageModule,
    ManutencaoPopoverPageModule,
    DataPopoverPageModule,
    ServicoabastecimentoPageModule,
    ServicocalculadoraflexPageModule,
    ServicodespesaPageModule,
    ServicolocaisPageModule,
    ServicomanutencaoPageModule,
    ServicoreceitaPageModule,
    ServicoveiculoPageModule,
    LocalPageModule,
    VeiculoPageModule,
    StoragePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
