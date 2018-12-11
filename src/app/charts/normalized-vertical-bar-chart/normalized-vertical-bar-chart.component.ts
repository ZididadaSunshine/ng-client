import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-normalized-vertical-bar-chart',
  template: `
  <div style="width: 100%; height: 100%;">
    <ngx-charts-bar-vertical-normalized 
      [results]="results"
      [xAxis]="xAxis"
      [yAxis]="yAxis"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [legend]="legend"
      >
    </ngx-charts-bar-vertical-normalized>
  </div>
  `,
  styleUrls: ['./normalized-vertical-bar-chart.component.css']
})
export class NormalizedVerticalBarChartComponent implements OnInit {

  results: any[];

  xAxis = true;
  yAxis = true;

  showXAxisLabel = true;
  showYAxisLabel = true;

  xAxisLabel = 'Time';
  yAxisLabel = 'Posts';

  legend = true;

  roundDomains = true;

  @Input()
  set data(json: string) {
    const datasets = [];
    const synonyms = Object.keys(json);
    const positives: Map<string, number> = new Map();
    const negatives: Map<string, number> = new Map();

    for (let synonym of synonyms) {
      const timestamps = Object.keys(json[synonym]);

      for (let timestamp of timestamps) {
        let tmp = json[synonym][timestamp];
        let statistics = tmp.statistics;
        let pposts = statistics.positive.posts;
        let nposts = statistics.negative.posts;


        if (positives.has(timestamp)) {
          const prev = positives.get(timestamp);
          positives.set(timestamp, (prev + pposts));
        } else {
          positives.set(timestamp, pposts);
        }

        if (negatives.has(timestamp)) {
          const prev = negatives.get(timestamp);
          negatives.set(timestamp, (prev + nposts));
        } else {
          negatives.set(timestamp, nposts);
        }
      }
    }

    const timestamps = new Set();

    for (let timestamp of positives.keys()) {
      timestamps.add(timestamp);
    }

    for (let timestamp of negatives.keys()) {
      timestamps.add(timestamp);
    }

    for (let timestamp of timestamps) {
      const series = [];

      if (negatives.has(timestamp)) {
        series.push({
          name: "Negative",
          value: negatives.get(timestamp)
        });
      }

      if (positives.has(timestamp)) {
        series.push({
          name: "Positive",
          value: positives.get(timestamp)
        });
      }

      datasets.push({
        name: timestamp,
        series: series
      });
    }

    this.results = datasets;
  }

  constructor() { }

  ngOnInit() {
  }

}
