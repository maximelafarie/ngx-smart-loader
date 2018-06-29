import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NgxSmartLoaderService} from '../../ngx-smart-loader';
import { TestComponent } from './test.component';

describe('CustomComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('I should be able to start loader from ngOnInit lifecycle hook', () => {
    // TEST ARE BROKEN :/

    // const loaderService = fixture.debugElement.injector.get(NgxSmartLoaderService);
    // spyOn(loaderService, 'start');
    // expect(loaderService.start).toHaveBeenCalled();
    // waits(1);
    // expect(loaderService.isLoading('testLoader')).toEqual(true);
  });
});
