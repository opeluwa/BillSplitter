import {NgModule} from '@angular/core';
import {SortPipe} from './sort.pipe';
import {DropDownDirective} from './dropDown.directive';
import {PlaceholderDirective} from './placeholder.directive';
import {LoadingSpinner} from './spinner/loading-spinner';
import {CommonModule} from '@angular/common';
import {FilterpayPipe} from '../active-bill/filterpay.pipe';
import {filterPipe} from '../active-bill/filter.pipe';
import {HttpClientModule} from '@angular/common/http';
import {BillSorterPipe} from './bill-sorter.pipe';
import {buttonDropDownDirective} from './buttonDropDown.directive';

@NgModule({
  declarations: [SortPipe, PlaceholderDirective,
    DropDownDirective, LoadingSpinner, FilterpayPipe, filterPipe, BillSorterPipe, buttonDropDownDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [SortPipe, PlaceholderDirective,
    DropDownDirective, LoadingSpinner, FilterpayPipe, filterPipe, BillSorterPipe, buttonDropDownDirective]
})

export class SharedModule { }
