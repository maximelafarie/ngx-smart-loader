import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiComponent } from './multi.component';

describe('MultiComponent', () => {
  let component: MultiComponent;
  let fixture: ComponentFixture<MultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
