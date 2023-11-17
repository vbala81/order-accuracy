import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderAPIService } from './OrderAPI.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor (private router: Router, private api: OrderAPIService) {
    this.api.loggedInObservable.subscribe(_lo => this.isLoggedIn=_lo);
  }
  title = 'Order Accuracy Demo';
  


  goCustomerDashboard() {
    this.isLoggedIn = true;
    this.api.isLoggedIn.next(this.isLoggedIn);
    this.router.navigate(['/dashboard/customer']);
  }
  goStoreDashboard() {
    this.api.isLoggedIn.next(this.isLoggedIn);
    this.router.navigate(['/dashboard/store']);
  }
}