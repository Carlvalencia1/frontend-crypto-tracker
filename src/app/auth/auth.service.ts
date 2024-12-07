import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay token
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token
  }
}
