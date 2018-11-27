import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentiLineChartComponent } from './senti-line-chart.component';

describe('SentiLineChartComponent', () => {
  let component: SentiLineChartComponent;
  let fixture: ComponentFixture<SentiLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentiLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentiLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
