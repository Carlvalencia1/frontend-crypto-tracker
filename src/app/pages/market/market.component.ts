// src/app/pages/market/market.component.ts
import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../negocio/services/crypto.service';
import { CryptoCardComponent } from '../../components/cards/crypto-card/crypto-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, CryptoCardComponent],
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent implements OnInit {
  cryptos: any[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoData().subscribe({
      next: (data) => {
        this.cryptos = data;
      },
      error: (error) => {
        console.error('Error al cargar criptomonedas:', error);
      },
    });
  }
}
