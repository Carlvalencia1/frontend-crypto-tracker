import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../negocio/services/crypto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  balance: number = 0.00;
  currency: string = 'ETH';
  equivalent: number = 0.00;
  pnlToday: number = 0.00;
  pnlPercentage: number = 0.00;

  popularCryptos: any[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoData().subscribe(data => {
      this.popularCryptos = data.slice(0, 5); // Obtener solo las primeras 5 criptomonedas
    });
  }
}
