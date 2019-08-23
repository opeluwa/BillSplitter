import {NgModule} from '@angular/core';
import {SortPipe} from './sort.pipe';
import {DropDownDirective} from './dropDown.directive';
import {PlaceholderDirective} from './placeholder.directive';
import {LoadingSpinner} from './spinner/loading-spinner';
import {CommonModule} from '@angular/common';
import {FilterpayPipe} from '../active-bill/filterpay.pipe';
import {filterPipe} from '../active-bill/filter.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [SortPipe, PlaceholderDirective,
    DropDownDirective, LoadingSpinner, FilterpayPipe, filterPipe],
  imports: [CommonModule, HttpClientModule],
  exports: [SortPipe, PlaceholderDirective,
    DropDownDirective, LoadingSpinner, FilterpayPipe, filterPipe]
})

export class SharedModule { }
