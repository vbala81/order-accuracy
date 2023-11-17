import { Component } from '@angular/core';
import { FOODITEMS, FoodItem } from '../showorders/fooditem';
import { Order } from '../showorders/order';
import { Observable, of } from 'rxjs';
//import { API } from 'aws-amplify';
//import {APIService, CreateORDERSInput} from '../API.service'
import { OrderAPIService } from '../OrderAPI.service';
//import {CreateORDERS} from "./graphql/mutations.graphql"

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent {
  foodItems:FoodItem[] = []
  placedOrders:Order[] = [];
  isOrderplaced = false;
  customerorder: String = "";
  order:Order = {customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
  placedOrder:Order = {customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
  isLoggedIn = false;
  constructor (private api: OrderAPIService) {}
  ngOnInit() {
      const foodItems = this.getFoodItems().subscribe(food => this.foodItems = food);
      this.api.isLoggedIn.next(true);
      
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
    // var orderInput: CreateORDERSInput = {};
    // orderInput.isready = this.order.isready;
    // orderInput.order = JSON.stringify(this.order.order);
    // orderInput.orderdate = this.order.orderdate.toISOString();
    // console.log(orderInput);

    //   let result = await this.api.CreateORDERS(orderInput)

    this.api.insertOrder(this.order).subscribe(
      {
        next: (order ) => { 
            this.placedOrder = order
            this.isOrderplaced = true
            this.placedOrders.push(this.placedOrder);
        },
        error: (e) => {
            console.log(e);
        } ,
        complete: () => console.info('complete') 
    }
    )
    
     

  }

  
}
