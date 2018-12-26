import {inject, TestBed, async} from '@angular/core/testing';

import {NgxSmartLoaderComponent, NgxSmartLoaderService} from './../../index';
import { LoaderInstance } from "../../src/services/loader-instance";

describe('NgxSmartLoaderService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartLoaderComponent
      ],
      providers: [
        NgxSmartLoaderService
      ],
    }).compileComponents();
  }));

  it('should create a loader', async(() => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myLoader';
    expect(app).toBeTruthy();
  }));

  it('should return null when trying to get uncreated loader', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        const myLoader = ngxSmartLoaderService.getLoader('myUnitializedLoader');
        expect(myLoader).toEqual(null);
      });
  }));

  it('should retrieve the created loader', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        const myLoader = ngxSmartLoaderService.getLoader('myLoader');
        expect(myLoader).toEqual(app);
      });
  }));

  it('should open and close the loader remotely', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        const compiled = fixture.debugElement.nativeElement;

        /* Start */
        const loader = ngxSmartLoaderService.getLoader('myLoader');
        expect(loader).not.toEqual(null);

        if (loader === null) {
          return;
        }

        loader.start();
        expect(app.loading).toBeTruthy();
        expect(app.visible).toBeTruthy();

        /* Stop */
        loader.stop();
        expect(app.loading).toBeFalsy();
        expect(app.visible).toBeFalsy();
      });
  }));

  it('should retrieve several loaders', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const otherFixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        otherApp.identifier = 'myOtherLoader';
        const stack = ngxSmartLoaderService.getLoaderStack();
        expect(stack.length).toEqual(2);
      });
  }));

  it('should start and stop several loaders at once', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const otherFixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        otherApp.identifier = 'myOtherLoader';

        ngxSmartLoaderService.start(['myLoader', 'myOtherLoader']);

        let stack = ngxSmartLoaderService.getLoaderStack();

        stack.forEach((o: LoaderInstance) => {
          expect(o.loader.loading).toBeTruthy();
          expect(o.loader.visible).toBeTruthy();
        });

        ngxSmartLoaderService.stop(['myLoader', 'myOtherLoader']);

        stack = ngxSmartLoaderService.getLoaderStack();

        stack.forEach((o: LoaderInstance) => {
          expect(o.loader.loading).toBeFalsy();
          expect(o.loader.visible).toBeFalsy();
        });
      });
  }));

  it('should retrieve several loaders with same identifier', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const otherFixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        otherApp.identifier = 'myLoader';
        const stack = ngxSmartLoaderService.getLoaderStack();
        expect(stack.length).toEqual(2);
      });
  }));

  it('should start and stop several loaders with same identifier at once', async(() => {
    inject([NgxSmartLoaderService],
      (ngxSmartLoaderService: NgxSmartLoaderService) => {
        const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const otherFixture = TestBed.createComponent(NgxSmartLoaderComponent);
        const app = fixture.debugElement.componentInstance;
        const otherApp = otherFixture.debugElement.componentInstance;
        app.identifier = 'myLoader';
        otherApp.identifier = 'myLoader';

        ngxSmartLoaderService.start(['myLoader']);

        let stack = ngxSmartLoaderService.getLoaderStack();

        stack.forEach((o: LoaderInstance) => {
          expect(o.loader.loading).toBeTruthy();
          expect(o.loader.visible).toBeTruthy();
        });

        ngxSmartLoaderService.stop(['myLoader']);

        stack = ngxSmartLoaderService.getLoaderStack();

        stack.forEach((o: LoaderInstance) => {
          expect(o.loader.loading).toBeFalsy();
          expect(o.loader.visible).toBeFalsy();
        });
      });
  }));

});
