import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from './estado';
import { Cidade } from './cidade';

const urlApiEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getEstados () {
    return this.http.get<Estado[]>(urlApiEstados);
  }

  getCidades (eId: number) {
    return this.http.get<Cidade[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ eId +'/municipios');
  }
}
