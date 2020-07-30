import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToonDetailComponent } from './toon-detail.component';

describe('ToonDetailComponent', () => {
  let component: ToonDetailComponent;
  let fixture: ComponentFixture<ToonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
