import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alert } from '../../persistencia/models/alert.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']  // Corrección de `styleUrl` a `styleUrls`
})
export class AlertsComponent {
  // Define `newAlert` usando la interfaz `Alert`
  newAlert: Alert = {
    crypto: '',
    price: 0
  };

  // Define `alerts` como un array de objetos `Alert`
  alerts: Alert[] = [];

  // Función para añadir una nueva alerta al array `alerts`
  addAlert() {
    if (this.newAlert.crypto && this.newAlert.price) {
      this.alerts.push({ ...this.newAlert });
      this.newAlert = { crypto: '', price: 0 }; // Reinicia `newAlert` después de añadir la alerta
    }
  }
}
