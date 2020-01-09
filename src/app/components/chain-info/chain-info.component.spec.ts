import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainInfoComponent } from './chain-info.component';

describe('ChainInfoComponent', () => {
  let component: ChainInfoComponent;
  let fixture: ComponentFixture<ChainInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
