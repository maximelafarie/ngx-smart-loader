import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgxSmartLoaderModule, NgxSmartLoaderService } from '../ngx-smart-loader/src/ngx-smart-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MultiComponent } from './multi/multi.component';
import { CustomComponent } from './custom/custom.component';

/* Import prism core */
import 'prismjs/prism';

/* Import the language you need to highlight */
import 'prismjs/components/prism-typescript';

import { PrismComponent } from 'angular-prism';

@NgModule({
  declarations: [
    PrismComponent,
    AppComponent,
    HomeComponent,
    MultiComponent,
    CustomComponent
  ],
  imports: [
    BrowserModule,
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
