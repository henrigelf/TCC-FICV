
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AbastecimentoPage } from '../abastecimento/abastecimento';
import { DespesasPage } from '../despesas/despesas';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResumoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resumo',
  templateUrl: 'resumo.html',
})
export class ResumoPage {

  @ViewChild('slider') slider: Slides;
  public page = 0;
  public ano: any = new Date().toISOString();
  private idUsuario: any;

  public gastoAbaste: any = false;

  public veiculos: Array<any> = [];
  public veiculo: any = 0;

  public resGasteiJaneiro: any = '0,00';
  public resGanheiJaneiro: any = '0,00';
  public resSobrouJaneiro: any = '0,00';

  public resGasteiFevereiro: any = '0,00';
  public resGanheiFevereiro: any = '0,00';
  public resSobrouFevereiro: any = '0,00';

  public resGasteiMarco: any = '0,00';
  public resGanheiMarco: any = '0,00';
  public resSobrouMarco: any = '0,00';

  public resGasteiAbril: any = '0,00';
  public resGanheiAbril: any = '0,00';
  public resSobrouAbril: any = '0,00';

  public resGasteiMaio: any = '0,00';
  public resGanheiMaio: any = '0,00';
  public resSobrouMaio: any = '0,00';

  public resGasteiJunho: any = '0,00';
  public resGanheiJunho: any = '0,00';
  public resSobrouJunho: any = '0,00';

  public resGasteiJulho: any = '0,00';
  public resGanheiJulho: any = '0,00';
  public resSobrouJulho: any = '0,00';

  public resGasteiAgosto: any = '0,00';
  public resGanheiAgosto: any = '0,00';
  public resSobrouAgosto: any = '0,00';

  public resGasteiSetembro: any = '0,00';
  public resGanheiSetembro: any = '0,00';
  public resSobrouSetembro: any = '0,00';

  public resGasteiOutubro: any = '0,00';
  public resGanheiOutubro: any = '0,00';
  public resSobrouOutubro: any = '0,00';

  public resGasteiNovembro: any = '0,00';
  public resGanheiNovembro: any = '0,00';
  public resSobrouNovembro: any = '0,00';

  public resGasteiDezembro: any = '0,00';
  public resGanheiDezembro: any = '0,00';
  public resSobrouDezembro: any = '0,00';

  public resGasteiCombustJaneiro: any = '0,00';
  public resTotKmJaneiro: any = '0';
  public resTotLitroJaneiro: any = '0';
  public resMedGeralJaneiro: any = '0';

  public resGasteiCombustFevereiro: any = '0,00';
  public resTotKmFevereiro: any = '0';
  public resTotLitroFevereiro: any = '0';
  public resMedGeralFevereiro: any = '0';

  public resGasteiCombustMarco: any = '0,00';
  public resTotKmMarco: any = '0';
  public resTotLitroMarco: any = '0';
  public resMedGeralMarco: any = '0';

  public resGasteiCombustAbril: any = '0,00';
  public resTotKmAbril: any = '0';
  public resTotLitroAbril: any = '0';
  public resMedGeralAbril: any = '0';

  public resGasteiCombustMaio: any = '0,00';
  public resTotKmMaio: any = '0';
  public resTotLitroMaio: any = '0';
  public resMedGeralMaio: any = '0';

  public resGasteiCombustJunho: any = '0,00';
  public resTotKmJunho: any = '0';
  public resTotLitroJunho: any = '0';
  public resMedGeralJunho: any = '0';

  public resGasteiCombustJulho: any = '0,00';
  public resTotKmJulho: any = '0';
  public resTotLitroJulho: any = '0';
  public resMedGeralJulho: any = '0';

  public resGasteiCombustAgosto: any = '0,00';
  public resTotKmAgosto: any = '0';
  public resTotLitroAgosto: any = '0';
  public resMedGeralAgosto: any = '0';

  public resGasteiCombustSetembro: any = '0,00';
  public resTotKmSetembro: any = '0';
  public resTotLitroSetembro: any = '0';
  public resMedGeralSetembro: any = '0';

  public resGasteiCombustOutubro: any = '0,00';
  public resTotKmOutubro: any = '0';
  public resTotLitroOutubro: any = '0';
  public resMedGeralOutubro: any = '0';

  public resGasteiCombustNovembro: any = '0,00';
  public resTotKmNovembro: any = '0';
  public resTotLitroNovembro: any = '0';
  public resMedGeralNovembro: any = '0';

  public resGasteiCombustDezembro: any = '0,00';
  public resTotKmDezembro: any = '0';
  public resTotLitroDezembro: any = '0';
  public resMedGeralDezembro: any = '0';



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public storage: Storage
  ) {
  }
  ionViewDidEnter(): void {
    this.storage.get("idUsuario").then((valor) => {
      this.idUsuario = JSON.stringify(valor[0].COD_USUARIO);
      this.load();
    });

  }
  selectedTab(index) {
    this.slider.slideTo(index);
    if (index == 0) {
      this.gastoAbaste = false;
    } else {
      this.gastoAbaste = true;
    }
  }
  load(): void {

    this.http
      .get('http://127.0.0.1/TestePHPApi/tbAuxiliar/consult_tbveiculo.php')
      .subscribe((veiculo: any) => {
        console.dir(veiculo);
        this.veiculos = veiculo;
        let tamanho = veiculo.length
        this.veiculo = veiculo[tamanho - 1].COD_VEICULO;

        this.retornaResumo();
      },
        (error: any) => {
          console.dir(error);
        });

  }
  retornaResumo() {

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes1: any) => {

        console.log("idUsuario: " + this.idUsuario + " Ano= " + this.ano + " Veiculo: " + this.veiculo);
        if (resAbastmes1[0].COD_VEICULO != null && resAbastmes1[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustJaneiro = resAbastmes1[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmJaneiro = resAbastmes1[0].MAX_ODOMETRO - resAbastmes1[0].MIN_ODOMETRO;
          this.resTotLitroJaneiro = resAbastmes1[0].TOTLITRO;

          if (resAbastmes1[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes1[0].TOTMEDIA / (resAbastmes1[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes1[0].TOTMEDIA / resAbastmes1[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustJaneiro = '0,00';
          this.resTotKmJaneiro = '0';
          this.resTotLitroJaneiro = '0';
          this.resMedGeralJaneiro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento2.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes2: any) => {
        if (resAbastmes2[0].COD_VEICULO != null && resAbastmes2[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustFevereiro = resAbastmes2[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmFevereiro = resAbastmes2[0].MAX_ODOMETRO - resAbastmes2[0].MIN_ODOMETRO;
          this.resTotLitroFevereiro = resAbastmes2[0].TOTLITRO;

          if (resAbastmes2[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes2[0].TOTMEDIA / (resAbastmes2[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes2[0].TOTMEDIA / resAbastmes2[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustJaneiro = '0,00';
          this.resTotKmJaneiro = '0';
          this.resTotLitroJaneiro = '0';
          this.resMedGeralJaneiro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento3.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes3: any) => {
        if (resAbastmes3[0].COD_VEICULO != null && resAbastmes3[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustMarco = resAbastmes3[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmMarco = resAbastmes3[0].MAX_ODOMETRO - resAbastmes3[0].MIN_ODOMETRO;
          this.resTotLitroMarco = resAbastmes3[0].TOTLITRO;

          if (resAbastmes3[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes3[0].TOTMEDIA / (resAbastmes3[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes3[0].TOTMEDIA / resAbastmes3[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustMarco = '0,00';
          this.resTotKmMarco = '0';
          this.resTotLitroMarco = '0';
          this.resMedGeralMarco = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento4.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes4: any) => {
        if (resAbastmes4[0].COD_VEICULO != null && resAbastmes4[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustAbril = resAbastmes4[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmAbril = resAbastmes4[0].MAX_ODOMETRO - resAbastmes4[0].MIN_ODOMETRO;
          this.resTotLitroAbril = resAbastmes4[0].TOTLITRO;

          if (resAbastmes4[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes4[0].TOTMEDIA / (resAbastmes4[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes4[0].TOTMEDIA / resAbastmes4[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustAbril = '0,00';
          this.resTotKmAbril = '0';
          this.resTotLitroAbril = '0';
          this.resMedGeralAbril = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento5.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes5: any) => {
        if (resAbastmes5[0].COD_VEICULO != null && resAbastmes5[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustMaio = resAbastmes5[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmMaio = resAbastmes5[0].MAX_ODOMETRO - resAbastmes5[0].MIN_ODOMETRO;
          this.resTotLitroMaio = resAbastmes5[0].TOTLITRO;

          if (resAbastmes5[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes5[0].TOTMEDIA / (resAbastmes5[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes5[0].TOTMEDIA / resAbastmes5[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustMaio = '0,00';
          this.resTotKmMaio = '0';
          this.resTotLitroMaio = '0';
          this.resMedGeralMaio = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento6.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes6: any) => {
        if (resAbastmes6[0].COD_VEICULO != null && resAbastmes6[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustJunho = resAbastmes6[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmJunho = resAbastmes6[0].MAX_ODOMETRO - resAbastmes6[0].MIN_ODOMETRO;
          this.resTotLitroJunho = resAbastmes6[0].TOTLITRO;
          if (resAbastmes6[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes6[0].TOTMEDIA / (resAbastmes6[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes6[0].TOTMEDIA / resAbastmes6[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustJunho = '0,00';
          this.resTotKmJunho = '0';
          this.resTotLitroJunho = '0';
          this.resMedGeralJunho = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento7.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes7: any) => {

        if (resAbastmes7[0].COD_VEICULO != null && resAbastmes7[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustJulho = resAbastmes7[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmJulho = resAbastmes7[0].MAX_ODOMETRO - resAbastmes7[0].MIN_ODOMETRO;
          this.resTotLitroJulho = resAbastmes7[0].TOTLITRO;

          if (resAbastmes7[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes7[0].TOTMEDIA / (resAbastmes7[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes7[0].TOTMEDIA / resAbastmes7[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustJulho = '0,00';
          this.resTotKmJulho = '0';
          this.resTotLitroJulho = '0';
          this.resMedGeralJulho = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento8.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes8: any) => {
        if (resAbastmes8[0].COD_VEICULO != null && resAbastmes8[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustAgosto = resAbastmes8[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmAgosto = resAbastmes8[0].MAX_ODOMETRO - resAbastmes8[0].MIN_ODOMETRO;
          this.resTotLitroAgosto = resAbastmes8[0].TOTLITRO;

          if (resAbastmes8[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes8[0].TOTMEDIA / (resAbastmes8[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes8[0].TOTMEDIA / resAbastmes8[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustAgosto = '0,00';
          this.resTotKmAgosto = '0';
          this.resTotLitroAgosto = '0';
          this.resMedGeralAgosto = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento9.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes9: any) => {
        if (resAbastmes9[0].COD_VEICULO != null && resAbastmes9[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustSetembro = resAbastmes9[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmSetembro = resAbastmes9[0].MAX_ODOMETRO - resAbastmes9[0].MIN_ODOMETRO;
          this.resTotLitroSetembro = resAbastmes9[0].TOTLITRO;

          if (resAbastmes9[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes9[0].TOTMEDIA / (resAbastmes9[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes9[0].TOTMEDIA / resAbastmes9[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustSetembro = '0,00';
          this.resTotKmSetembro = '0';
          this.resTotLitroSetembro = '0';
          this.resMedGeralSetembro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento10.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes10: any) => {
        if (resAbastmes10[0].COD_VEICULO != null && resAbastmes10[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustOutubro = resAbastmes10[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmOutubro = resAbastmes10[0].MAX_ODOMETRO - resAbastmes10[0].MIN_ODOMETRO;
          this.resTotLitroOutubro = resAbastmes10[0].TOTLITRO;

          if (resAbastmes10[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes10[0].TOTMEDIA / (resAbastmes10[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes10[0].TOTMEDIA / resAbastmes10[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustOutubro = '0,00';
          this.resTotKmOutubro = '0';
          this.resTotLitroOutubro = '0';
          this.resMedGeralOutubro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento11.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes11: any) => {
        if (resAbastmes11[0].COD_VEICULO != null && resAbastmes11[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustNovembro = resAbastmes11[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmNovembro = resAbastmes11[0].MAX_ODOMETRO - resAbastmes11[0].MIN_ODOMETRO;
          this.resTotLitroNovembro = resAbastmes11[0].TOTLITRO;

          if (resAbastmes11[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes11[0].TOTMEDIA / (resAbastmes11[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes11[0].TOTMEDIA / resAbastmes11[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustNovembro = '0,00';
          this.resTotKmNovembro = '0';
          this.resTotLitroNovembro = '0';
          this.resMedGeralNovembro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_abastecimento12.php?ano=" + this.ano + "&id=" + this.idUsuario + "&codMod=" + this.veiculo)
      .subscribe((resAbastmes12: any) => {
        if (resAbastmes12[0].COD_VEICULO != null && resAbastmes12[0].MAX_ODOMETRO != null) {
          this.resGasteiCombustDezembro = resAbastmes12[0].TOTABAST.toFixed(3).replace('.', ',');
          this.resTotKmDezembro = resAbastmes12[0].MAX_ODOMETRO - resAbastmes12[0].MIN_ODOMETRO;
          this.resTotLitroDezembro = resAbastmes12[0].TOTLITRO;

          if (resAbastmes12[0].MIN_MEDIA == 0) {
            this.resMedGeralJunho = (resAbastmes12[0].TOTMEDIA / (resAbastmes12[0].REPET_ABAST - 1)).toFixed(3).replace('.', ',');
          } else {
            this.resMedGeralJunho = (resAbastmes12[0].TOTMEDIA / resAbastmes12[0].REPET_ABAST).toFixed(3).replace('.', ',');
          }

        } else {
          this.resGasteiCombustDezembro = '0,00';
          this.resTotKmDezembro = '0';
          this.resTotLitroDezembro = '0';
          this.resMedGeralDezembro = '0';
        }
      },
        (error: any) => {
          console.dir(error);
        })

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=01" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiJaneiro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiJaneiro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouJaneiro = (parseFloat(this.resGanheiJaneiro) - parseFloat(this.resGasteiJaneiro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=02" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiFevereiro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiFevereiro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouFevereiro = (parseFloat(this.resGanheiFevereiro) - parseFloat(this.resGasteiFevereiro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });
    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=03" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiMarco = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiMarco = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouMarco = (parseFloat(this.resGanheiMarco) - parseFloat(this.resGasteiMarco)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=04" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiAbril = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiAbril = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouAbril = (parseFloat(this.resGanheiAbril) - parseFloat(this.resGasteiAbril)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=05" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiMaio = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiMaio = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouMaio = (parseFloat(this.resGanheiMaio) - parseFloat(this.resGasteiMaio)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=06" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiJunho = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiJunho = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouJunho = (parseFloat(this.resGanheiJunho) - parseFloat(this.resGasteiJunho)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=07" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiJulho = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiJulho = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouJulho = (parseFloat(this.resGanheiJulho) - parseFloat(this.resGasteiJulho)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=08" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiAgosto = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiAgosto = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouAgosto = (parseFloat(this.resGanheiAgosto) - parseFloat(this.resGasteiAgosto)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=09" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiSetembro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiSetembro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouSetembro = (parseFloat(this.resGanheiSetembro) - parseFloat(this.resGasteiSetembro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=10" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiOutubro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiOutubro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouOutubro = (parseFloat(this.resGanheiOutubro) - parseFloat(this.resGasteiOutubro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=11" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiNovembro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiNovembro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouNovembro = (parseFloat(this.resGanheiNovembro) - parseFloat(this.resGasteiNovembro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

    this.http
      .get("http://127.0.0.1/TestePHPApi/TBAuxiliarResumo/consult_gastoGeral.php?idUsuario=" + this.idUsuario + "&mes=12" + "&ano=" + this.ano)
      .subscribe((gastoGeral: any) => {
        this.resGasteiDezembro = ((gastoGeral[1].valorDesp == null ? 0 : gastoGeral[1].valorDesp) + (gastoGeral[2].valorDesp == null ? 0 : gastoGeral[2].valorDesp) + (gastoGeral[3].valorDesp == null ? 0 : gastoGeral[3].valorDesp)).toFixed(2).replace('.', ',');
        this.resGanheiDezembro = (gastoGeral[0].valor == null ? 0 : gastoGeral[0].valor).toFixed(2).replace('.', ',');
        this.resSobrouDezembro = (parseFloat(this.resGanheiDezembro) - parseFloat(this.resGasteiDezembro)).toFixed(2).replace('.', ',');
      },
        (error: any) => {
          console.dir(error);
        });

  }
  movieButton($event) {
    this.page = $event._snapIndex.toString();

    if ($event._snapIndex.toString() == 1) {
      this.gastoAbaste = true;
    } else {
      this.gastoAbaste = false;
    }

  }
  goAbastecimento() {
    this.navCtrl.push(AbastecimentoPage);
  }
  goDespesas() {
    this.navCtrl.push(DespesasPage);
  }

}
