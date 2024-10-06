import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ShoppingItem {
  name: string;
  purchased: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private items: ShoppingItem[] = [];

  // BehaviorSubject que mantém o estado da lista e permite a subscrição
  private itemsSubject = new BehaviorSubject<ShoppingItem[]>(this.items);

  // Observable que será utilizado pelos componentes para acessar os dados
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  // Obter todos os itens (não necessário se estiver usando items$)
  getItems(): ShoppingItem[] {
    return this.items;
  }

  // Adicionar novo item
  addItem(itemName: string): void {
    if (itemName.trim()) {
      this.items.push({ name: itemName, purchased: false });
      this.updateItems(); // Garante que o BehaviorSubject emite a nova lista
    }
  }

  // Editar um item
  editItem(index: number, newItemName: string): void {
    if (newItemName.trim()) {
      this.items[index].name = newItemName;
      this.updateItems();
    }
  }

  // Alternar status de compra
  togglePurchase(index: number): void {
    this.items[index].purchased = !this.items[index].purchased;
    this.updateItems();
  }

  // Remover item da lista
  deleteItem(index: number): void {
    this.items.splice(index, 1);
    this.updateItems();
  }

  // Método para notificar todos os subscritores de mudanças
  private updateItems(): void {
    this.itemsSubject.next(this.items);
  }
}
