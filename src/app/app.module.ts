import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgxSmartLoaderModule, NgxSmartLoaderService } from '../ngx-smart-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MultiComponent } from './multi/multi.component';
import { CustomComponent } from './custom/custom.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MultiComponent,
    CustomComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgxSmartLoaderModule.forRoot()
  ],
  providers: [
    NgxSmartLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
