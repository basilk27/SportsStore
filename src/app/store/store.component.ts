import {Component, Signal, computed, signal } from '@angular/core';
import { Product } from '../model/product';
import { ProductRepository } from '../model/product.repository';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

  products: Signal<Product[]>;
  categories: Signal<string[]>;

  selectedCategory = signal<string | undefined>(undefined);

  productsPerPage = signal(4);
  selectedPage = signal(1);
  pageProducts: Signal<Product[]>;
  pageNumbers: Signal<number[]>;

  constructor(private repository: ProductRepository) {
    this.products = computed(() => {
      if (this.selectedCategory() == undefined) {
        return this.repository.products();
      } else {
        return this.repository.products()
          .filter(p => p.category === this.selectedCategory());
      }
    })
    this.categories = repository.categories;

    let pageIndex = computed(() => {
      return (this.selectedPage() - 1) * this.productsPerPage();
    });

    this.pageProducts = computed(() => {
      return this.products().slice(pageIndex(), pageIndex() + this.productsPerPage());
    });

    this.pageNumbers = computed(() => {
      return Array(Math.ceil(this.products().length / this.productsPerPage()))
        .fill(0).map((x, i) => i + 1);
    });
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory.set(newCategory);
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectedPage.set(newPage);
  }

  changePageSize(newPageSize: number) {
    this.productsPerPage.set(Number(newPageSize));
    this.changePage(1);
  }
}
