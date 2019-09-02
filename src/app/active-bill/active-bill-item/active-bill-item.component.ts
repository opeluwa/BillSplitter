import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BillComponent} from '../../bill/bill.component';
import {PlaceholderDirective} from '../../Shared/placeholder.directive';
import {take} from 'rxjs/operators';
import {UserBillModel} from '../../Shared/userBill.model';
import * as fromApp from '../../AppStore/app.reducer';
import * as fromBill from '../../bill/store/bill.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-active-bill-item',
  templateUrl: './active-bill-item.component.html',
  styleUrls: ['./active-bill-item.component.css']
})
export class ActiveBillItemComponent implements OnInit, OnDestroy {
  @Input() Item: number;
  selectedItem: UserBillModel;
  popup = true;
  isLoading = false;

  @ViewChild(PlaceholderDirective, {static: false}) BillHost: PlaceholderDirective;    // gives access to a pointer to where this directive is used
  constructor(private router: Router, private route: ActivatedRoute,
              private ComponentFactory: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }

              sub: Subscription;
              paidSub: Subscription;
              closeSub: Subscription;


  ngOnInit() {
    this.sub = this.store.select('bill').pipe(take(1)).subscribe((billState: fromBill.State) => {
      this.selectedItem = billState.bills[this.Item];
      this.isLoading = billState.isLoading;
    });
  }

  Onclick() {  // when a bill is clicked, a component is made.
    const cmpFactory = this.ComponentFactory.resolveComponentFactory(BillComponent);  // knows how to create  Bill component
    const hostViewContainer = this.BillHost.viewContainerRef;   // we are asigning the view to be editted to this const
    hostViewContainer.clear(); // clear what was here before.
    this.popup = !this.popup;

    const compRef =  hostViewContainer.createComponent(cmpFactory);
    compRef.instance.selectedItem = this.selectedItem;
    compRef.instance.Index = this.Item;

    this.closeSub =  compRef.instance.closeDiv.subscribe(() => {
      compRef.destroy();
      this.popup = !this.popup;
    });

    this.paidSub = compRef.instance.payBill.subscribe(() => {  // listen to whether a pay request has been emitted.
      compRef.destroy();
      this.popup = !this.popup;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

    if (this.paidSub) {
      this.paidSub.unsubscribe();
    }

    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
