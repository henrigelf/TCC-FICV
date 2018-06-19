import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AbastecimentoPage } from '../abastecimento/abastecimento';
 
@IonicPage()
@Component({
  selector: 'page-servicocalculadoraflex',
  templateUrl: 'servicocalculadoraflex.html',
})
export class ServicocalculadoraflexPage {

  public form                   : FormGroup;

  public calcFlexGasolina : any = null;
  public calcFlexAlcool  : any = null;

  public calcFlexPorcentagem  : any = 70;
  public resultado:any = null;

  constructor( 
    public navCtrl: NavController,  
    public navParams: NavParams,
    public fb : FormBuilder 
  ) {
    // Create form builder validation rules - Criar regras de validação do construtor de formulários
    this.form = fb.group({
      "calcFlexGasolina"    : ["", Validators.required],
      "calcFlexAlcool"      : ["", Validators.required],
      "calcFlexPorcentagem" : ["",]
   });
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicocalculadoraflexPage');
  }
 
  calcularGasAlc(){
    let resultado = (this.calcFlexAlcool / this.calcFlexGasolina)

    if(resultado < (this.calcFlexPorcentagem/100))
    {
      this.resultado = "Recomendamos o uso de Etanol"
    }else{
      this.resultado = " Recomendamos o uso de Gasolina"
    }
    //console.log("CALCULO = " +this.resultado)
  }

  viewEntryAbast(){
    this.navCtrl.push(AbastecimentoPage);
  }

  checar(){  
    if( this.calcFlexGasolina == '' || this.calcFlexAlcool == '' ){
      this.resultado = null;
    }
  }

}
