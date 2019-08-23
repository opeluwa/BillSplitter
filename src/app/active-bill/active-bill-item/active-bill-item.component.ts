import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {BillModel} from '../../Shared/bill.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BillsService} from '../../Shared/bills.service';
import {BillComponent} from '../../bill/bill.component';
import {PlaceholderDirective} from '../../Shared/placeholder.directive';
import {map, take, tap} from 'rxjs/operators';
import {UserBillModel} from '../../Shared/userBill.model';
import {Moment} from 'moment';
@Component({
  selector: 'app-active-bill-item',
  templateUrl: './active-bill-item.component.html',
  styleUrls: ['./active-bill-item.component.css']
})
export class ActiveBillItemComponent implements OnInit {
  @Input() Item: number;
  selectedItem: UserBillModel;
  popup = true;
  isLoading = false;

  @ViewChild(PlaceholderDirective, {static: false}) BillHost: PlaceholderDirective;    // gives access to a pointer to where this directive is used
  constructor(private router: Router, private route: ActivatedRoute, private billServ: BillsService,
              private ComponentFactory: ComponentFactoryResolver) { }

  ngOnInit() {
    this.selectedItem = this.billServ.getIndexBill(this.Item); // set the bill item from the index given

  }

  Onclick() {  // when a bill is clicked, a component is made.
    const cmpFactory = this.ComponentFactory.resolveComponentFactory(BillComponent);  // knows how to create  Bill component
    const hostViewContainer = this.BillHost.viewContainerRef;   // we are asigning the view to be editted to this const
    hostViewContainer.clear(); // clear what was here before.
    this.popup = !this.popup;

    const compRef =  hostViewContainer.createComponent(cmpFactory);
    compRef.instance.selectedItem = this.selectedItem;
    compRef.instance.Index = this.Item;
    compRef.instance.closeDiv.subscribe(() => {
      compRef.destroy();
      this.popup = !this.popup;
    });

    compRef.instance.payBill.subscribe(() => {  // listen to whether a pay request has been emitted.
      compRef.destroy();
      this.popup = !this.popup;
    });
  }

}
