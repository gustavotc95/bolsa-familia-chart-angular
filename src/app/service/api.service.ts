import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from './estado';
import { Cidade } from './cidade';
import { DadosGov } from './dadosGov';

const urlApiEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>(urlApiEstados);
  }

  getCidades(eId: number) {
    return this.http.get<Cidade[]>(urlApiEstados + eId + '/municipios');
  }

  getDadosMunicipio(mId: number, mesAno: number) {
    return this.http.get<DadosGov>(
      'http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio?mesAno=' + mesAno + '&codigoIbge=' + mId + '&pagina=1');
  }
}
