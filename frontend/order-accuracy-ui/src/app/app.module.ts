import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { ShowordersComponent } from './showorders/showorders.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerorderComponent } from './customerorder/customerorder.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceorderComponent,
    ShowordersComponent,
    CustomerorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
