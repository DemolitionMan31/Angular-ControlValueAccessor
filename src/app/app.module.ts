import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomInput2Component } from './custom-input2/custom-input2.component';
import { SelectorComponent } from './selector/selector.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    CustomInput2Component,
    SelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
