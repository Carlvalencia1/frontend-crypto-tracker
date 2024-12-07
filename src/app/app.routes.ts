// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MarketComponent } from './pages/market/market.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AuthGuard } from './auth/auth.guard';
export const routes: Routes = [
 { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'register', component:  RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'market', component: MarketComponent, canActivate: [AuthGuard]  },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard]  },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'favorites', component: FavoritesComponent }
];
