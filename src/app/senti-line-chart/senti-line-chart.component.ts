import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senti-line-chart',
  templateUrl: './senti-line-chart.component.html',
  styleUrls: ['./senti-line-chart.component.css']
})


export class SentiLineChartComponent {

  // lineChart
  public lineChartData: Array<any> = makeDatasets(DATA);
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time'
      }]
    }
  };
  public lineChartColors: Array<any> = [
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
  public lineChartLegend = true;
  public lineChartType = 'line';

  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}














const DATA =
[
    {
        synonym: "apple",
        mentions :
        [
            {
                date : "2017-01-07 18:00:00",
                num_mentions : 1
            },
            {
                date : "2017-02-07 18:00:00",
                num_mentions : 2
            },
            {
                date : "2017-03-07 18:00:00",
                num_mentions : 3
            },
            {
                date : "2017-04-07 18:00:00",
                num_mentions : 4
            },
            {
                date : "2017-05-07 18:00:00",
                num_mentions : 5
            },
            {
                date : "2017-06-07 18:00:00",
                num_mentions : 6
            },
            {
                date : "2017-07-07 18:00:00",
                num_mentions : 7
            },
            {
                date : "2017-08-07 18:00:00",
                num_mentions : 8
            },
            {
                date : "2017-09-07 18:00:00",
                num_mentions : 9
            }
        ]
    },

    {
        synonym: "samsung",
        mentions :
        [
            {
                date : "2017-01-07 18:00:00",
                num_mentions : 22
            },
            {
                date : "2017-02-07 18:00:00",
                num_mentions : 33
            },
            {
                date : "2017-03-07 18:00:00",
                num_mentions : 25
            },
            {
                date : "2017-04-07 18:00:00",
                num_mentions : 24
            },
            {
                date : "2017-05-07 18:00:00",
                num_mentions : 23
            },
            {
                date : "2017-06-07 18:00:00",
                num_mentions : 32
            },
            {
                date : "2017-07-07 18:00:00",
                num_mentions : 33
            },
            {
                date : "2017-08-07 18:00:00",
                num_mentions : 35
            },
            {
                date : "2017-09-07 18:00:00",
                num_mentions : 42
            }
        ]
    }
]





function getRandomColor()
{
    let r = function () { return Math.floor(Math.random() * 256) };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}

function makeDatasets(mentionsList) {
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
                borderColor: getRandomColor(),
                data: data
            });
    });

    return datasets;
}
