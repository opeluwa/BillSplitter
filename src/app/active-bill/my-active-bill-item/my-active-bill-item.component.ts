import {Component, Input, OnInit} from '@angular/core';
import {MyActiveModel} from '../../Shared/myActive.model';

@Component({
  selector: 'app-my-active-bill-item',
  templateUrl: './my-active-bill-item.component.html',
  styleUrls: ['./my-active-bill-item.component.css']
})
export class MyActiveBillItemComponent implements OnInit {
  @Input() selectedItem: MyActiveModel;
  constructor() { }

  ngOnInit() {
  }

}
