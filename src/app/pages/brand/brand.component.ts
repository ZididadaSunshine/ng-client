import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-pages/brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  // Number of columns per row
  cols: number;

  data =
    [
      {
        synonym: "apple",
        mentions:
          [
            {
              date: "2017-01-07 18:00:00",
              num_mentions: 1
            },
            {
              date: "2017-02-07 18:00:00",
              num_mentions: 2
            },
            {
              date: "2017-03-07 18:00:00",
              num_mentions: 3
            },
            {
              date: "2017-04-07 18:00:00",
              num_mentions: 4
            },
            {
              date: "2017-05-07 18:00:00",
              num_mentions: 5
            },
            {
              date: "2017-06-07 18:00:00",
              num_mentions: 6
            },
            {
              date: "2017-07-07 18:00:00",
              num_mentions: 7
            },
            {
              date: "2017-08-07 18:00:00",
              num_mentions: 8
            },
            {
              date: "2017-09-07 18:00:00",
              num_mentions: 9
            }
          ]
      },
      {
        synonym: "samsung",
        mentions:
          [
            {
              date: "2017-01-07 18:00:00",
              num_mentions: 22
            },
            {
              date: "2017-02-07 18:00:00",
              num_mentions: 33
            },
            {
              date: "2017-03-07 18:00:00",
              num_mentions: 25
            },
            {
              date: "2017-04-07 18:00:00",
              num_mentions: 24
            },
            {
              date: "2017-05-07 18:00:00",
              num_mentions: 23
            },
            {
              date: "2017-06-07 18:00:00",
              num_mentions: 32
            },
            {
              date: "2017-07-07 18:00:00",
              num_mentions: 33
            },
            {
              date: "2017-08-07 18:00:00",
              num_mentions: 35
            },
            {
              date: "2017-09-07 18:00:00",
              num_mentions: 42
            }
          ]
      }
    ]

  // lineChart
  lineChartData: Array<any> = this.makeDatasets(this.data);

  lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time'
      }]
    }
  };

  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  lineChartLegend: boolean = true;
  lineChartType: string = 'line';

  ngOnInit(): void {
    // Set the number of cols based on breakpoint
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe((({ matches }) => this.cols = matches === true ? 1 : 2));
  }

  constructor(private breakpointObserver: BreakpointObserver) { }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }


  getRandomColor() {
    let r = function () { return Math.floor(Math.random() * 256) };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }

  makeDatasets(mentionsList) {
    // Mentions have the following shape:
    // mentions =
    // {
    //     synonym: "apple",
    //     mentions :
    //     [
    //         {
    //             date: 'DD-MM-YYY',
    //             num_mentions: 123
    //         }
    //     ]
    // };
    let datasets = [];
    mentionsList.forEach((element) => {
      let synonym = element.synonym;
      let data = [];
      // Format all mention entries into x/y coordinates.
      element.mentions.forEach((mentionsEntry) => {
        data.push(
          {
            x: mentionsEntry.date,
            y: mentionsEntry.num_mentions
          })
      });
      // Convert mentions into a graphable object
      datasets.push(
        {
          label: synonym,
          borderColor: this.getRandomColor(),
          data: data
        });
    });

    return datasets;
  }
}
