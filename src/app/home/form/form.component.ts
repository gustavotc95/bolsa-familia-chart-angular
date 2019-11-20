import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Estado } from 'src/app/service/estado';
import { Cidade } from 'src/app/service/cidade';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  estados: Estado[] = [];

  cidades: Cidade[] = [];

  selectedEstado: number = 0;

  selectedCidade: number = 0;

  constructor(private apiService: ApiService) {}

  filtraEstados(prop: string) {
    return this.estados.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  listaEstados (): void {
    this.apiService.getEstados().subscribe(
      res => { this.estados = res; this.filtraEstados('nome')},
      err => { console.log(err.msg) }
    );
  }

  getCidades (eId: number): void {
    this.apiService.getCidades(eId).subscribe(
      res => { this.cidades = res },
      err => { console.log(err.msg) }
    );
  }

  ngOnInit() {
    this.listaEstados()
  }

  logThis(newValue) {
    console.log(newValue);
  }

}
