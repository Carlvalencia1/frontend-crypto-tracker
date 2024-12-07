import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transaction {
  date: string;
  type: string;
  crypto: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'] // Corrige "styleUrl" a "styleUrls"
})
export class TransactionsComponent {
  transactions: Transaction[] = [
    { date: '2023-11-01', type: 'Buy', crypto: 'BTC', quantity: 0.005, price: 30000 },
    { date: '2023-11-02', type: 'Sell', crypto: 'ETH', quantity: 0.1, price: 2000 },
    // Agrega más transacciones aquí según lo necesites
  ];
}
