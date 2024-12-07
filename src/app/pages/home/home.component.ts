import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTooltip, ApexStroke, ApexDataLabels } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../negocio/services/crypto.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {}; // Inicialización con un objeto vacío
  cryptos: any[] = []; // Array para almacenar los datos de las criptomonedas

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCryptoData().subscribe(data => {
      this.cryptos = data;
      this.initChart();
    });
  }

  private initChart(): void {
    this.chartOptions = {
      series: this.cryptos.map(crypto => ({
        name: crypto.name,
        data: [
          { x: 'Current Price', y: crypto.current_price },
          { x: '24h High', y: crypto.high_24h },
          { x: '24h Low', y: crypto.low_24h }
        ]
      })),
      chart: {
        type: 'line',
        height: 450,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Current Price', '24h High', '24h Low'],
        title: {
          text: 'Price Points'
        }
      },
      yaxis: {
        title: {
          text: 'Price (USD)'
        },
        labels: {
          formatter: val => `$${val.toFixed(2)}`
        }
      },
      tooltip: {
        shared: true,
        y: {
          formatter: val => `$${val.toFixed(2)}`
        }
      }
    };
  }
}
