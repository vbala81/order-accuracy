import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { ShowordersComponent } from './showorders/showorders.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceorderComponent,
    ShowordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
