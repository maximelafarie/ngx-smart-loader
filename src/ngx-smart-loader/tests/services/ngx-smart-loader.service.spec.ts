import { inject, TestBed, async } from '@angular/core/testing';

import { NgxSmartLoaderComponent, NgxSmartLoaderService } from './../../index';
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

  it('should be created', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should addLoader', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const loader = fixture.debugElement.componentInstance;
    loader.id = 'myLoader';

    service.addLoader(loader);

    expect(service.getLoaderStack()[0]).toEqual(loader);
  }));

  it('should addLoader with force', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const loader = fixture.debugElement.componentInstance;
    loader.id = 'myLoader';

    service.addLoader(loader);

    service.addLoader(loader, true);

    expect(service.getLoaderStack().length).toEqual(1);
    expect(service.getLoaderStack()[0]).toEqual(loader);
  }));

  it('should addLoader with same identifier', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const loader = fixture.debugElement.componentInstance;
    loader.id = 'myLoader';

    service.addLoader(loader);

    expect(() => { service.addLoader(loader); }).toThrow(new Error('Loader with myLoader identifier already exist'));
  }));

  it('should removeLoader', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const loader = fixture.debugElement.componentInstance;
    loader.id = 'myLoader';

    service.addLoader(loader);

    spyOn(<any>service, '_removeAction');

    service.removeLoader('myLoader');

    expect(service.getLoaderStack().length).toEqual(0);
    expect((<any>service)._removeAction).toHaveBeenCalledWith('myLoader', '*');
  }));

  it('should getLoaderStackCount', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    expect(service.getLoaderStackCount()).toEqual(0);

    const fixture = TestBed.createComponent(NgxSmartLoaderComponent);
    const loader = fixture.debugElement.componentInstance;
    loader.id = 'myLoader';

    service.addLoader(loader);

    expect(service.getLoaderStackCount()).toEqual(1);
  }));

  it('should getOpenedLoaders', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { component: { visible: true } },
      { component: { visible: true } },
      { component: { visible: false } }
    ]

    expect(service.getOpenedLoaders().length).toEqual(2);
  }));

  it('should getActiveLoaders', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { component: { loading: true } },
      { component: { loading: true } },
      { component: { loading: false } }
    ]

    expect(service.getActiveLoaders().length).toEqual(2);
  }));

  it('should getHigherIndex', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { component: { layerPosition: 10, visible: true } },
      { component: { layerPosition: 50, visible: false } },
      { component: { layerPosition: 2, visible: true } }
    ]

    expect(service.getHigherIndex()).toEqual(11);
  }));

  it('should start ( with array )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    spyOn(service, 'start').and.callThrough();

    service.start(['1', '2']);

    expect(service.start).toHaveBeenCalledWith('1');
    expect(service.start).toHaveBeenCalledWith('2');
  }));

  it('should start ( with existing loader )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    spyOn(<any>service, '_getLoader').and.returnValue({ component: { start: () => { } } });
    spyOn(<any>service, '_removeAction')

    service.start('myLoader');

    expect((<any>service)._getLoader).toHaveBeenCalledWith('myLoader');
    expect((<any>service)._removeAction).toHaveBeenCalledWith('myLoader', 'start');
  }));

  it('should startAll', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { id: '1' },
      { id: '2' }
    ]

    spyOn(service, 'start');

    service.startAll();

    expect(service.start).toHaveBeenCalledWith('1');
    expect(service.start).toHaveBeenCalledWith('2');
  }));

  it('should stop ( with array )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    spyOn(service, 'stop').and.callThrough();

    service.stop(['1', '2']);

    expect(service.stop).toHaveBeenCalledWith('1');
    expect(service.stop).toHaveBeenCalledWith('2');
  }));

  it('should stop ( with existing loader )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    spyOn(<any>service, '_getLoader').and.returnValue({ component: { stop: () => { } } });
    spyOn(<any>service, '_removeAction')

    service.stop('myLoader');

    expect((<any>service)._getLoader).toHaveBeenCalledWith('myLoader');
    expect((<any>service)._removeAction).toHaveBeenCalledWith('myLoader', 'stop');
  }));

  it('should stopAll', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { id: '1' },
      { id: '2' }
    ]

    spyOn(service, 'stop');

    service.stopAll();

    expect(service.stop).toHaveBeenCalledWith('1');
    expect(service.stop).toHaveBeenCalledWith('2');
  }));

  it('should isLoading ( with array )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { id: '1', component: { loading: true } },
      { id: '2', component: { loading: false } },
    ]

    expect(service.isLoading(['1', '2'])).toEqual(false);
  }));

  it('should isLoading', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._loaderStack = [
      { id: '2', component: { loading: true } },
    ]

    expect(service.isLoading('2')).toEqual(true);
  }));

  it('should _addAction', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._addAction('1', 'start');

    expect((<any>service)._actions).toEqual([{ identifier: '1', action: 'start' }]);
  }));

  it('should _addAction ( with array )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._addAction(['1', '2'], 'start');

    expect((<any>service)._actions).toEqual([{ identifier: '1', action: 'start' }, { identifier: '2', action: 'start' }]);
  }));

  it('should _removeAction', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._actions = [{ identifier: '1', action: 'start' }];

    (<any>service)._removeAction('1', 'start');

    expect((<any>service)._actions).toEqual([]);
  }));

  it('should _removeAction ( with array )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._actions = [{ identifier: '1', action: 'start' }, { identifier: '2', action: 'start' }];

    (<any>service)._removeAction(['1', '2'], 'start');

    expect((<any>service)._actions).toEqual([]);
  }));

  it('should _removeAction ( all action )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._actions = [{ identifier: '1', action: 'start' }, { identifier: '1', action: 'stop' }];

    (<any>service)._removeAction('1', '*');

    expect((<any>service)._actions).toEqual([]);
  }));

  it('should executeAction ( case start )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._actions = [{ identifier: '1', action: 'start' }];

    spyOn(service, 'start');

    service.executeAction('1', 'start');

    expect(service.start).toHaveBeenCalledWith('1');
  }));

  it('should executeAction ( case stop )', inject([NgxSmartLoaderService], (service: NgxSmartLoaderService) => {
    (<any>service)._actions = [{ identifier: '1', action: 'stop' }];

    spyOn(service, 'stop');

    service.executeAction('1', 'stop');

    expect(service.stop).toHaveBeenCalledWith('1');
  }));
});
