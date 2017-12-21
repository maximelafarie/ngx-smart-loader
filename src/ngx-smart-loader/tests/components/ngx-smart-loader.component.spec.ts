import { TestBed, async } from '@angular/core/testing';
import { NgxSmartLoaderComponent, NgxSmartLoaderService } from './../../index';

describe('NgxSmartLoaderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSmartLoaderComponent
      ],
      providers: [
        NgxSmartLoaderService
      ]
    }).compileComponents();
  }));

  it('should create a loader', async(() => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myLoader';
    expect(app).toBeTruthy();
  }));

  it('should start and stop the loader directly', async(() => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myLoader';
    app.start();
    app.onStart.subscribe(() => {
      expect(app.loading).toBeTruthy();
      expect(app.visible).toBeTruthy();
      app.stop();
    });

    app.onStop.subscribe(() => {
      expect(app.loading).toBeFalsy();
      expect(app.visible).toBeFalsy();
    });
  }));

  it('should add additional class to the loader', async(() => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myLoader';
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.start();
    app.onStart.subscribe(() => {
      const firstRef = app.customClass.includes('firstClass');
      const secondRef = app.customClass.includes('secondClass');
      expect(firstRef).toBeTruthy();
      expect(secondRef).toBeTruthy();
    });
  }));

  it('should remove additional class of the loader', async(() => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const app = fixture.debugElement.componentInstance;
    app.identifier = 'myLoader';
    app.addCustomClass('firstClass');
    app.addCustomClass('secondClass');
    app.removeCustomClass('firstClass');
    app.start();
    app.onStart.subscribe(() => {
      const firstRef = app.customClass.includes('firstClass');
      const secondRef = app.customClass.includes('secondClass');
      expect(firstRef).toBeFalsy();
      expect(secondRef).toBeTruthy();
    });
  }));

});
