// src/app/negocio/services/crypto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private currency = 'usd';

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de las criptomonedas
  getCryptoData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?vs_currency=${this.currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true`);
  }
}
