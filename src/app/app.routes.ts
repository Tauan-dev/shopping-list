import { Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component'; // Importe o componente

// Adicione 'export' antes de 'const routes'
export const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent }, // Defina a rota
  { path: '', redirectTo: 'shopping-list', pathMatch: 'full' }, // Redirecionar para a lista de compras
  { path: '**', redirectTo: 'shopping-list' }, // Redirecionar rotas inválidas para a lista de compras
];
