import { Component } from '@angular/core';
import { FOODITEMS, FoodItem } from './fooditem';
import { Observable,of } from 'rxjs';
import { Order } from './order';
import {APIService, CreateORDERSInput} from '../API.service'
import { orderDisplay } from './orderdisplay';
import { interval } from 'rxjs';


@Component({
  selector: 'app-showorders',
  templateUrl: './showorders.component.html',
  styleUrls: ['./showorders.component.css']
})
export class ShowordersComponent {
  orders:orderDisplay[] = [];
  order:orderDisplay = {order: '', orderdate: '' , orderissue:"", orderId:''};
  returnorder: any

  
  constructor (private api: APIService) {}
  ngOnInit() {
     

     const interval$ = interval(5000);

     // Subscribe to the observable and do something every 1000 milliseconds
     interval$.subscribe(val => {
      this.orders = [];
      this.getOrders();
     });



  }


  
  async getOrders() {
    let result = await this.api.ListORDERS();
   // console.log(result);
    result.items.forEach ((item)=> {
      console.log("======" + item);
      this.order = {order: '', orderdate: '' , orderissue:"", orderId:''};
       this.returnorder = item?.order
      this.returnorder = JSON.parse(this.returnorder?this.returnorder:"[]")
      this.returnorder = this.returnorder.map((el:any)=> el.name)
      //console.log(this.returnorder.join(","))
      this.order.order = this.returnorder.join(",")
      this.order.orderId = item!.id
      this.order.orderdate = item?.orderdate!;
    //  console.log(this.order)
     
      this.orders.push(this.order);

    })
    console.log(this.orders
      )
   
    }
}