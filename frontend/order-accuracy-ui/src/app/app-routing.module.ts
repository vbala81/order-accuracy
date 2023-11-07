import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowordersComponent } from './showorders/showorders.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';

const routes: Routes = [
  { path: 'dashboard/store', component: ShowordersComponent },
  { path: 'dashboard/customer', component: PlaceorderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
