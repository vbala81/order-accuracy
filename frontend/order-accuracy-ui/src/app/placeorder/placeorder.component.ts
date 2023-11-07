import { Component } from '@angular/core';
import { FOODITEMS, FoodItem } from '../showorders/fooditem';
import { Order } from '../showorders/order';
import { Observable, of } from 'rxjs';
import { API } from 'aws-amplify';
import {APIService, CreateORDERSInput} from '../API.service'
//import {CreateORDERS} from "./graphql/mutations.graphql"

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent {
  foodItems:FoodItem[] = []
  customerorder: String = "";
  order:Order = {order: [], orderdate: new Date(), isready: false, orderissue:""};
  isLoggedIn = false;
  constructor (private api: APIService) {}
  ngOnInit() {
      const foodItems = this.getFoodItems().subscribe(food => this.foodItems = food);
      
  }


  getFoodItems(): Observable<FoodItem[]> {
    const interfaces = of(FOODITEMS);
    return interfaces;
  }

  addItemtoOrder(item: FoodItem) {
    console.log(item);
    this.order.order.push(item);
    this.customerorder = this.order.order.map((o)=>o.name).join(",");
    console.log(this.customerorder);

  }

  async placeOrder() {
    var orderInput: CreateORDERSInput = {};
    orderInput.isready = this.order.isready;
    orderInput.order = JSON.stringify(this.order.order);
    orderInput.orderdate = this.order.orderdate.toISOString();
    console.log(orderInput);

      let result = await this.api.CreateORDERS(orderInput)
     

  }

  
}
