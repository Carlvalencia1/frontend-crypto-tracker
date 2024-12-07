import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../services/favorites.service';
import { Favorite } from '../../../models/favorites';

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css'],
})
export class CryptoCardComponent implements OnChanges {
  @Input() crypto: any;

  priceClass: string = '';
  showMore: boolean = false;
  showMenu: boolean = false;
  showModal: boolean = false;
  isFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['crypto'] && this.crypto) {
      this.priceClass =
        this.crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';
      this.checkIfFavorite();
    }
  }

  toggleMore(): void {
    this.showMore = !this.showMore;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  checkIfFavorite(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.some(
          (fav) => fav.cryptoSymbol === this.crypto.symbol.toUpperCase()
        );
      },
      error: (error) => {
        console.error('Error al verificar favoritos:', error);
      },
    });
  }

  addToFavorites(): void {
    if (this.isFavorite) {
      alert(`${this.crypto.name} ya está en favoritos.`);
      this.closeModal();
      return;
    }

    const favorite: Favorite = {
      cryptoSymbol: this.crypto.symbol.toUpperCase(),
      cryptoName: this.crypto.name,
    };

    this.favoritesService.addFavorite(favorite).subscribe({
      next: () => {
        alert(`${this.crypto.name} guardado como favorito.`);
        this.isFavorite = true;
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al guardar como favorito:', error);
        alert('Hubo un problema al guardar la criptomoneda.');
      },
    });
  }

  removeFromFavorites(): void {
    if (!this.isFavorite) {
      alert(`${this.crypto.name} no está en favoritos.`);
      return;
    }

    this.favoritesService.removeFavorite(this.crypto.symbol.toUpperCase()).subscribe({
      next: () => {
        alert(`${this.crypto.name} eliminado de favoritos.`);
        this.isFavorite = false; // Actualiza el estado local
        this.showMenu = false;   // Oculta el menú después de la acción
      },
      error: (error) => {
        console.error('Error al eliminar de favoritos:', error);
        alert('Hubo un problema al eliminar la criptomoneda de favoritos.');
      },
    });
  }
}
