import { Component, OnInit } from '@angular/core';
import { ShoppingListService, ShoppingItem } from '../shopping-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule, // Importando o módulo de ícones
  ],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  newItem: string = '';
  items$: Observable<ShoppingItem[]>;

  constructor(private shoppingListService: ShoppingListService) {
    this.items$ = this.shoppingListService.items$;
  }

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      console.log(items);
    });
  }

  addItem(): void {
    if (this.newItem.trim()) {
      this.shoppingListService.addItem(this.newItem);
      this.newItem = '';
    }
  }

  editItem(index: number): void {
    const updatedItem = prompt(
      'Editar item',
      this.shoppingListService.getItems()[index].name
    );
    if (updatedItem && updatedItem.trim()) {
      this.shoppingListService.editItem(index, updatedItem);
    }
  }

  togglePurchase(index: number): void {
    this.shoppingListService.togglePurchase(index);
  }

  deleteItem(index: number): void {
    this.shoppingListService.deleteItem(index);
  }

  get notPurchasedItems() {
    return this.shoppingListService
      .getItems()
      .filter((item: ShoppingItem) => !item.purchased);
  }

  get purchasedItems() {
    return this.shoppingListService
      .getItems()
      .filter((item: ShoppingItem) => item.purchased);
  }
}
