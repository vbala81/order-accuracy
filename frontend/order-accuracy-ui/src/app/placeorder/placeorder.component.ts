import { Component } from '@angular/core';
import { FOODITEMS, FoodItem, Item } from '../showorders/fooditem';
import { Order } from '../showorders/order';
import { Observable, of } from 'rxjs';
import { OrderAPIService } from '../OrderAPI.service';
import { Router } from '@angular/router';
import { LoginDetails } from '../logindetails';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent {
  foodItems:FoodItem[] = []
  placedOrders:Order[] = [];
  loginDetails:LoginDetails = {id:'',name:''}
  isOrderplaced = false;
  customerorder: String = "";
  order:Order = {customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
  placedOrder:Order = {customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
  constructor (private api: OrderAPIService, private router: Router) {}
  ngOnInit() {
      const foodItems = this.getFoodItems().subscribe(food => this.foodItems = food);

      Promise.resolve().then( () => {
        this.api.logindetails.next({name:"Dave Bob",id:"7077"})
        this.api.logindetails.subscribe(_d => this.loginDetails = _d);
        this.api.isLoggedIn.next(true);
        
      })
      
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
  removeItem(orderindex: number, itemindex: number, item:Item) {
    this.order.order[orderindex].items = this.order.order[orderindex].items.filter(it=> it!==item)
    
  }

  async placeOrder() {
    this.api.logindetailObservable.subscribe(_o => this.order.customerId = _o.id);
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
        complete: () => {
            this.router.navigate(["/dashboard/customer/" + this.order.customerId])
        }
    }
    )
    
     

  }

  
}
