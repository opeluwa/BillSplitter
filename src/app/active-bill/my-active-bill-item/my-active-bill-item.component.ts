import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-active-bill-item',
  templateUrl: './my-active-bill-item.component.html',
  styleUrls: ['./my-active-bill-item.component.css']
})
export class MyActiveBillItemComponent implements OnInit {
  @Input() selectedItem;
  constructor() { }

  ngOnInit() {
  }

}
