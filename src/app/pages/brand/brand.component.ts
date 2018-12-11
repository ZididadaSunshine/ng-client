import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Brand, Synonym } from '../../models';
import { BrandService, StatisticsService } from '../../services';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as shape from 'd3-shape';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-pages/brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
        display: 'none',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class BrandComponent implements OnInit {
  brand: Brand;

  _chartDataSource = new BehaviorSubject<string>(null);
  chartData$ = this._chartDataSource.asObservable();


  from: Date = new Date();
  to: Date = new Date();
  granularity: string = 'day';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  ngOnInit(): void {
    this.from.setDate(this.to.getDate() - 7);

    this.route.paramMap.subscribe(paramMap => {
      const id = Number(paramMap.get('id'));

      this.brandService.get(id).subscribe(
        brand => {
          this.brand = brand;
          this.fetchStatistics();
        },
        error => {
          console.log(error);
        }
      );
    });

  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService) { }


  fetchStatistics() {
    this.from = new Date(this.from);
    this.to = new Date(this.to);

    this.statisticsService.get(this.from.toJSON(), this.to.toJSON(), this.granularity, this.brand.id).subscribe(
      data => this._chartDataSource.next(data),
      error => console.log(error)
    );
  }



}
