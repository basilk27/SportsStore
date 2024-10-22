import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRepository } from './product.repository';
import { StaticDatasource } from './static.datasource';

@NgModule({
  providers: [
    ProductRepository,
    StaticDatasource
  ],
  // declarations: [],
  imports: [
     CommonModule
  ]
})
export class ModelModule { }
