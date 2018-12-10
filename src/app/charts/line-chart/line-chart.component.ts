import { Component, OnInit, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

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
  chartData: any[];
  colorScheme = {
    domain: []
  };


  @Input()
  set data(json: string) {
    const datasets = [];
    const synonyms = Object.keys(json);

    for (let synonym of synonyms) {
      const entries = [];
      const timestamps = Object.keys(json[synonym]);

      for (let timestamp of timestamps) {
        let tmp = json[synonym][timestamp];
        let sentiment = tmp.sentiment;
        let statistics = tmp.statistics;

        entries.push({
          name: new Date(timestamp),
          value: sentiment,
          statistics: statistics
        });
      }

      if (this.colorScheme.domain.length != synonyms.length) {
        let color = '';
        do {
          color = this.colorService.random();
        }
        while (this.colorScheme.domain.find(x => x === color));
        
        this.colorScheme.domain.push(color);
      }

      datasets.push({
        name: synonym,
        series: entries
      });
    }

    this.chartData = datasets;
  }

  getStatistics(label, timestamp : Date) {
    const series: any[] = this.chartData.find(x => x.name === label).series;
    const statistics = series.find(x => x.name.getTime() === timestamp.getTime()).statistics;
 
    return statistics;
  }
  

  constructor(private colorService : ColorService) { }

  ngOnInit() {
  }

}
