import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from './OrderAPI.service';
import { LoginDetails } from './logindetails';
import { Order } from './showorders/order';
import { Item } from './showorders/fooditem';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   implements OnInit {
  isLoggedIn: boolean = false;

  isOrderplaced = false;
  badgeCount:number = 0;
  disableOrder = false;

  @ViewChild('snav', { static: true })
  myNav!: MatSidenav;
  
  order:Order = {customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
  static myNav: any;
 
  constructor (private router: Router, private api: OrderAPIService) {
    
    this.api.orderPlaceObservable.subscribe(_or => {
      this.order = _or  
      this.badgeCount= _or.order.length});
    this.api.loggedInObservable.subscribe(_lo => this.isLoggedIn=_lo);
    this.api.logindetailObservable.subscribe(_ll => this.loginDetails = _ll);
  }
  ngOnInit(): void {
    console.log("On init ")
    console.log(this.myNav)
    this.oneorderallowed();
  }

  
  title = 'Order Accuracy Demo';
  
  loginDetails : LoginDetails = {name:"",id:""};

  

  goCustomerDashboard() {
    
    this.isLoggedIn = true;
    // this.loginDetails = {name:"Dave Bob", id: "7077"}
    // this.api.logindetails.next(this.loginDetails);
    // this.api.isLoggedIn.next(this.isLoggedIn);
    this.router.navigate(['/dashboard/customer']);
  }
  goStoreDashboard() {
    // this.loginDetails = {name:"Store #101", id: "7077"}
    // this.api.logindetails.next(this.loginDetails);
    // this.api.isLoggedIn.next(this.isLoggedIn);
    this.router.navigate(['/dashboard/store']);
  }

  goHome() {
    this.api.logindetails.next({name:"",id:""});
    this.api.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  removeItem(orderindex: number, itemindex: number, item:Item) {
    this.order.order[orderindex].items = this.order.order[orderindex].items.filter(it=> it!==item)
    
  }

  oneorderallowed() {
    this.api.listorders().subscribe(_r => {
      if(_r.Count > 0)
       this.disableOrder = true;
    });
  }
  

  placeOrder() {
    this.api.logindetailObservable.subscribe(_o => this.order.customerId = _o.id);
    let customerId = this.order.customerId;
    this.api.insertOrder(this.order).subscribe(
      {
        next: (order ) => { 
            
            this.isOrderplaced = true
            this.api.orderPlace.next({customerId:'',orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''});
            
            
        },
        error: (e) => {
            console.log(e);
        } ,
        complete: () => {
          this.myNav.close();
          this.router.navigate(["/dashboard/customer/" + customerId])
            
        }
    }
    )
  }
}