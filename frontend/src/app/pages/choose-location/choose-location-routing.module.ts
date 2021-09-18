import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseLocationComponent } from './choose-location.component';

const routes: Routes = [{ path: '', component: ChooseLocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseLocationRoutingModule { }
