import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoCardComponent } from '../../components/cards/crypto-card/crypto-card.component';
import { FavoritesService } from '../../services/favorites.service';
import { Favorite } from '../../models/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,CryptoCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      },
    });
  }
}
