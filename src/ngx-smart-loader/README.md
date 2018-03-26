![ngx-smart-loader](https://user-images.githubusercontent.com/5319267/34251919-f4a51274-e641-11e7-8c5d-f2dddfc742ac.png)

[![Greenkeeper badge](https://badges.greenkeeper.io/biig-io/ngx-smart-loader.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/biig-io/ngx-smart-loader.svg?branch=master)](https://travis-ci.org/biig-io/ngx-smart-loader) [![npm version](https://badge.fury.io/js/ngx-smart-loader.svg)](https://badge.fury.io/js/ngx-smart-loader) [![npm downloads](https://img.shields.io/npm/dm/ngx-smart-loader.svg)](https://npmjs.org/ngx-smart-loader) [![codecov](https://codecov.io/gh/biig-io/ngx-smart-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/biig-io/ngx-smart-loader)

`ngx-smart-loader` is a lightweight and very complete Angular component for managing loaders inside any Angular project. It was built for modern browsers using TypeScript, HTML5 and Angular >=2.0.0.

## Demo
http://biig-io.github.io/ngx-smart-loader/


## Powerful and so easy to use! 🤙
Managing loaders has always been a big deal, mostly if you want to manage several loaders at the same time. With this library, it has never been so easy to do: a complete API to manage absolutely everything in your app.

`ngx-smart-loader` also comes with a fancy default loader (demo default page's loader) in case you don't want to add your own.

Check out the [documentation](https://github.com/biig-io/ngx-smart-loader) & [demos](https://github.com/biig-io/ngx-smart-loader) for more information and tutorials!

See the [changelog](https://github.com/biig-io/ngx-smart-loader/CHANGELOG.md) for recent changes.

## Features
 - Handle large quantity of loaders anywhere in your app
 - Customize the style of your loaders through custom CSS classes
 - No external CSS library is used so you can easily add yours
 - Manipulate groups of loader at the same time
 - Events on `start` and `stop` for each loader
 - Manage all your loaders stack with very fast methods
 - Very smart `z-index` computation
 - Check for loader(s) activity
 - AoT compilation support

## Setup
To use `ngx-smart-loader` in your project install it via [npm](https://www.npmjs.com/package/ngx-smart-loader):
```
npm i ngx-smart-loader --save
```
or
```
yarn add ngx-smart-loader
```

Then add `NgxSmartLoaderModule` (with `.forRoot()` or `.forChild()` depending if the module which you import the library into is the main module of your project or a nested module) and `NgxSmartLoaderService` to your project's `NgModule`
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartLoaderModule.forRoot()
  ],
  providers: [ NgxSmartLoaderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Parameters / Options
`ngx-smart-loader` comes with some parameters / options in order to make it fit your needs. The following parameters / options needs to be used like this: `<ngx-smart-loader [parameter-or-option-name]="value"></ngx-smart-loader>`

The below documentation will use the following pattern: 
> `parameter/option name` (type) | default value | required? ― _description_

- `identifier` (string) | `undefined` | **REQUIRED** ― _The identifiant of the loader instance. Retrieve a loader easily by its identifier. **You can set the same identifier to several loaders**._

- `force` (boolean) | false ― _If true and if you declare another loader instance with the same identifier that another, the service will override it by the new you declare in the loader stack. By default, it allows you to declare multiple loaders with same identifier in order to manipulate them at once._

- `customClass` (string) | `''` ― _All the additional classes you want to add to the loader (e.g.: for your custom loaders). You can add several classes by giving a string with space-separated classnames_

- `delayIn` (number) | `0` ― _In milliseconds. Define the time after which you want to display your loader. The `.active` class only append to loader after this time. The `.enter` class append to the loader instantly and disappears after this delay._

- `delayOut` (number) | `0` ― _In milliseconds. Define the time after which you want to hide your loader. The `.active` class only disappears from the loader after this time. The `.leave` class append to the loader instantly and disappears after this delay._

## Manipulate loaders
First, you need to add a loader to any template at any level in your app (all examples will use the default library built-in loader).
```
<ngx-smart-loader identifier="myLoader">
  <div class="loader">
    <div class="circle"></div>
  </div>
</ngx-smart-loader>
```
At this point, the loader instance is stored in the `NgxSmartLoaderService`. You can do absolutely what you want with it, anywhere in your app. For example, from a component (here we're starting the loader automatically after one second):
```
import { Component, AfterViewInit } from '@angular/core';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  ...
})
export class HomeComponent implements AfterViewInit {

  constructor(public loader: NgxSmartLoaderService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loader.start('myLoader');
    }, 1000);
  }

}
```

## Http calls
Following the same example as above, you can use the `NgxSmartLoaderService` to start a loader. Here's a more concrete example:

Let's imagine you have a function that makes an Http request to retrieve a user list (this example uses the [rxjs Observable](https://github.com/ReactiveX/rxjs/blob/master/doc/observable.md). This is an example, you need to adapt it to your needs):
```
public users: User[] = [];

getUsers (): User[] {
  this.loader.start('myLoader');
  return this.http.get<User[]>('api/v2/users')
    .subscribe(
      users => this.users = users,
      err => console.error('something wrong occurred: ' + err),
      () => this.loader.stop('myLoader');
    );
}
```
As you can see above, we're starting the loader before Http request. Then in the `subscribe()` we're stopping when the request finished.

## Handle events
`ngx-smart-loader` comes with two built-in events: `onStart` and `onStop`.

 - `onStart`: loader has been opened
 - `onStop`: loader has been closed

You can handle events directly from the view...
```
<ngx-smart-loader identifier="myLoader" (onStart)="log('Loader started!')" (onStop)="log('Loader stopped!')">
  <div class="loader">
    <div class="circle"></div>
  </div>
</ngx-smart-loader>
```
...and execute component functions:
```
@Component({
  ...
})
export class AppComponent {
  constructor() {
  }

  public log(msg: string) {
    console.log(msg);
  }
}
```

Or you also can declare a loader in any template (e.g.: the library's built-in loader)...
```
<ngx-smart-loader identifier="myLoader">
  <div class="loader">
    <div class="circle"></div>
  </div>
</ngx-smart-loader>
```
... and listen to its events from any component:
```
export class AppComponent implements AfterViewInit {
  ...
  constructor(public loader: NgxSmartLoaderService) {
  }

  ngAfterViewInit() {
    this.loader.getLoader('myLoader').onStart.subscribe(res => {
      console.log('start');
    });

    this.loader.getLoader('myLoader').onStop.subscribe(res => {
      console.log('stop');
    });
  }
}
```

## Contribute
Firstly fork this repo, then clone it and go inside the root of the freshly forked project.
`ng serve` to start the angular-cli demo.
To modify the package, go into `/src/ngx-smart-loader` and do some code! 🤓
When you finished commit and push it to your fork repo, make a PR!
Thank you for your support, you rock! 🤘🎸

