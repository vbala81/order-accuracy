import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from './OrderAPI.service';
import { LoginDetails } from './logindetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor (private router: Router, private api: OrderAPIService) {
    this.api.loggedInObservable.subscribe(_lo => this.isLoggedIn=_lo);
    this.api.logindetailObservable.subscribe(_ll => this.loginDetails = _ll);
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
}