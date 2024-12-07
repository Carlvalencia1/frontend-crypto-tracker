import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = 'http://localhost:3000/api/v1/users/1/favorites/';

  constructor(private http: HttpClient) {}

  addFavorite(favorite: Favorite): Observable<any> {
    return this.http.post(this.baseUrl, favorite);
  }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.baseUrl);
  }

  removeFavorite(cryptoSymbol: string): Observable<void> {
    const url = `${this.baseUrl}${cryptoSymbol}`;
    return this.http.delete<void>(url);
  }
}
