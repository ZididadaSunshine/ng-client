import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Brand, Synonym } from '../../models';
import { BrandService, StatisticsService } from '../../services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-pages/brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brand$: Observable<Brand>;
  synonyms$: Observable<Synonym[]>;

  brand: Brand;
  synonyms: Synonym[];

  // Number of columns per row
  cols: number;


  ngOnInit(): void {
    

    this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        this.statisticsService.get('2018-12-04T12:00:00', '2018-12-10T10:00:00', 'day', id).subscribe(
          (data) => {
            this.chartData = this.makeDatasets(data);
          }
        );
        this.brand$ = this.brandService.get(id);
        this.synonyms$ = this.brandService.getSynonyms(id);
      },
      error => console.log(error)
    );

    this.brand$.subscribe(
      brand => (this.brand = brand),
      error => console.log(error)
    );

    this.synonyms$.subscribe(
      synonyms => (this.synonyms = synonyms),
      error => console.log(error)
    );

    // Set the number of cols based on breakpoint
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe((({ matches }) => this.cols = matches === true ? 1 : 2));
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService) { }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  getKeywords(label, timestamp : Date) {
    const series: any[] = this.chartData.find(x => x.name === label).series;
    const statistics = series.find(x => x.name.getTime() === timestamp.getTime()).statistics;
 
    return statistics;
  }

  getRandomColor() {
    const r = function () { return Math.floor(Math.random() * 256); };
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')';
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Sentiment';
  timeline = true;
  curve: any = shape.curveMonotoneX; 

  colorScheme = {
    domain: []
  };

  chartData: any[];

  makeDatasets(data) {
    const datasets = [];

    for (let synonym of Object.keys(data)) {
      const entries = [];
      for (let timestamp of Object.keys(data[synonym])) {
        let tmp = data[synonym][timestamp];
        let sentiment = tmp.sentiment;
        let statistics = tmp.statistics;

        entries.push({
          name: new Date(timestamp),
          value: sentiment,
          statistics: statistics
        });
      }

      this.colorScheme.domain.push(this.getRandomColor());

      datasets.push({
        name: synonym,
        series: entries
      });
    }

    console.log(datasets);

    return datasets;
  }
}
