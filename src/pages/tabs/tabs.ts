import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ResumoPage } from '../resumo/resumo';
//import { GastometaPage } from '../gastometa/gastometa';
import { ServicoPage } from '../servico/servico';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ResumoPage;
  //tab3Root = GastometaPage;
  tab4Root = ServicoPage;


  constructor() {

  }
}
