import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';


@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule
  ],
  exports: [
    WidgetsBrandComponent
  ]
})
export class WidgetsModule { }
