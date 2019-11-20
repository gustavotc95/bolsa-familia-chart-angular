import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Estado } from 'src/app/service/estado';
import { Cidade } from 'src/app/service/cidade';
import { DadosGov } from 'src/app/service/dadosGov';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  estados: Estado[] = [];

  cidades: Cidade[] = [];

  dados: DadosGov[] = [];

  selectedEstado: number = 0;

  selectedCidade: number = 0;

  mesesAteriores: Array<string> = [];

  mesesNomes: Array<string> = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  chart: any = [];

  chartShow: boolean = false;

  loading: boolean = false;

  constructor(private apiService: ApiService) {}

  filtraEstados(prop: string) {
    return this.estados.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  listaEstados (): void {
    this.mesesAteriores = [];
    // this.estados = [];
    // this.cidades = [];
    // this.loading = false;

    this.apiService.getEstados().subscribe(
      res => { this.estados = res; this.filtraEstados('nome')},
      err => { console.log(err.msg) }
    );
  }

  listaCidades (eId: number): void {
    this.apiService.getCidades(eId).subscribe(
      res => { this.cidades = res },
      err => { console.log(err.msg) }
    );
  }

  listaDadosMunicipio(mId: number): void {
    let meses: any = this.getMeses();
    meses.forEach((mes: number, index: number)  => {
      this.apiService.getDadosMunicipio(mId, mes).subscribe(
        res => { 
          this.loading = true;
          this.dados.push(res[0]); 
          if (index === 11){
            this.criaGrafico(this.dados)
          }
        },
        err => { console.log(err.msg) }
      );
    });
  }

  addZero (i: string | number) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  getMeses() {
    let date = new Date();
    let meses = [];
    for(let i = 0; i < 13; i++) {
      meses.push(String(date.getFullYear()) + this.addZero(date.getMonth() + 1));
      date.setMonth(date.getMonth() - 1);
    }  
    meses.splice(0, 1)
    return meses
  }

  criaGrafico(dados: DadosGov[]) {
    let quantidade: Array<number> = []
    let valor: Array<number>  = []
    dados.forEach((dado, index) => {
      quantidade[index] = dado.quantidadeBeneficiados
      valor[index] = dado.valor
      this.mesesAteriores[index] = dado.dataReferencia 
    });
    this.chartShow = true;

    this.loading = false;

    console.log(quantidade);
    console.log(valor);
    console.log(this.mesesAteriores);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.mesesAteriores,
        datasets: [
          { 
            label: 'Valor total destinado ao Programa',
            data: valor,
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            label: 'Quantidade de beneficiários',
            data: quantidade,
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            id: 'first-y-axis',
            type: 'logarithmic'
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.listaEstados()
  }

  logThis(newValue: any) {
    console.log(newValue);
  }

}
