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

  // lineChart
  lineChartData: Array<any> = this.makeDatasets(MOCK_DATA);

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time'
      }]
    },
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: false,

      custom: function(tooltipModel) {
          // Tooltip Element
          let tooltipEl = document.getElementById('chartjs-tooltip');

          // Create element on first render
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0';
              return;
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
              tooltipEl.classList.add('no-transform');
          }

          function getBody(bodyItem) {
              return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {

              // Chart js magic to extract the brand name
              const defaultBodyLines = tooltipModel.body.map(getBody);
              const brand = defaultBodyLines[0][0].split(':')[0];

              // Set up title and body
              const titleLines = ['Top-5 keywords for ' + brand];
              const bodyLines = ['Good, Service, Client, Loan, Friendly']; // TODO: Find the correct keywords.

              // Initialize structure
              let innerHtml = '<thead>';

              titleLines.forEach(function(title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                  const colors = tooltipModel.labelColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              const tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
          }

          // `this` will be the overall tooltip
          const position = this._chart.canvas.getBoundingClientRect();

          // Display, position, and set styles for the tooltip
          tooltipEl.style.opacity = '0.75';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.zIndex = '1'; // Move on top of the card
          tooltipEl.style.background = 'black'; // Color background
          tooltipEl.style.color = 'white'; // Contrast text
          tooltipEl.style.borderRadius = '5px'; // Fuck dig jarlund, vi skal have runde hjørner
      }
    }
  };

  // lineChartColors: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   }
  // ];

  lineChartLegend = true;
  lineChartType = 'line';

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
    const r = function () { return Math.floor(Math.random() * 256); };
    return 'rgb(' + r() + ',' + r() + ',' + r() + ')';
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
    const datasets = [];
    mentionsList.forEach((element) => {
      const synonym = element.synonym;
      const data = [];
      // Format all mention entries into x/y coordinates.
      element.mentions.forEach((mentionsEntry) => {
        data.push(
          {
            x: mentionsEntry.date,
            y: mentionsEntry.num_mentions
          });
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








// tslint:disable-next-line:max-line-length
const MOCK_DATA = [{'synonym': 'apple', 'mentions': [{'date': '2018-11-27 0:00:0', 'num_mentions': 0.22511399873101356}, {'date': '2018-11-28 0:00:0', 'num_mentions': -0.6968233391723002}, {'date': '2018-11-29 0:00:0', 'num_mentions': 0.05244936997156979}, {'date': '2018-11-30 0:00:0', 'num_mentions': -0.7266454327679281}, {'date': '2018-12-01 0:00:0', 'num_mentions': -0.7972231917955197}, {'date': '2018-12-02 0:00:0', 'num_mentions': -0.40281605928161013}, {'date': '2018-12-03 0:00:0', 'num_mentions': 0.2599286028906377}, {'date': '2018-12-04 0:00:0', 'num_mentions': 0.7086409601930881}, {'date': '2018-12-05 0:00:0', 'num_mentions': 1.0339284498980479}, {'date': '2018-12-06 0:00:0', 'num_mentions': 0.5310032211427111}, {'date': '2018-12-07 0:00:0', 'num_mentions': 1.1152735250536034}, {'date': '2018-12-08 0:00:0', 'num_mentions': 2.0631542980221838}, {'date': '2018-12-09 0:00:0', 'num_mentions': 2.5930614580467157}, {'date': '2018-12-10 0:00:0', 'num_mentions': 2.691406223941641}, {'date': '2018-12-11 0:00:0', 'num_mentions': 2.526333139418204}, {'date': '2018-12-12 0:00:0', 'num_mentions': 3.34370088170747}, {'date': '2018-12-13 0:00:0', 'num_mentions': 2.709460271901742}, {'date': '2018-12-14 0:00:0', 'num_mentions': 3.024077086811774}, {'date': '2018-12-15 0:00:0', 'num_mentions': 3.4949231546927333}, {'date': '2018-12-16 0:00:0', 'num_mentions': 3.2487879360037364}, {'date': '2018-12-17 0:00:0', 'num_mentions': 3.694320120798173}, {'date': '2018-12-18 0:00:0', 'num_mentions': 3.5148428214299616}, {'date': '2018-12-19 0:00:0', 'num_mentions': 3.7642254365656442}, {'date': '2018-12-20 0:00:0', 'num_mentions': 3.493876463452093}, {'date': '2018-12-21 0:00:0', 'num_mentions': 3.795955942217759}, {'date': '2018-12-22 0:00:0', 'num_mentions': 3.9171170614639914}, {'date': '2018-12-23 0:00:0', 'num_mentions': 3.0876337819108794}, {'date': '2018-12-24 0:00:0', 'num_mentions': 2.7894269681299697}, {'date': '2018-12-25 0:00:0', 'num_mentions': 3.2144521147629455}, {'date': '2018-12-26 0:00:0', 'num_mentions': 2.56708199545887}, {'date': '2018-12-27 0:00:0', 'num_mentions': 2.7988942097277274}, {'date': '2018-12-28 0:00:0', 'num_mentions': 2.3228234223094395}, {'date': '2018-12-29 0:00:0', 'num_mentions': 2.887333941724279}, {'date': '2018-12-30 0:00:0', 'num_mentions': 3.0428882398792267}, {'date': '2018-12-31 0:00:0', 'num_mentions': 2.220132344571571}, {'date': '2019-01-01 0:00:0', 'num_mentions': 1.9943887787012011}, {'date': '2019-01-02 0:00:0', 'num_mentions': 2.032261366521853}, {'date': '2019-01-03 0:00:0', 'num_mentions': 1.037430911292975}, {'date': '2019-01-04 0:00:0', 'num_mentions': 1.5739725644314388}, {'date': '2019-01-05 0:00:0', 'num_mentions': 1.4751292902384403}, {'date': '2019-01-06 0:00:0', 'num_mentions': 0.7430225350140004}, {'date': '2019-01-07 0:00:0', 'num_mentions': -0.13897016479581858}, {'date': '2019-01-08 0:00:0', 'num_mentions': -0.9270960429071861}, {'date': '2019-01-09 0:00:0', 'num_mentions': -1.5810800979322441}, {'date': '2019-01-10 0:00:0', 'num_mentions': -1.564649832961133}, {'date': '2019-01-11 0:00:0', 'num_mentions': -2.0357678792833616}, {'date': '2019-01-12 0:00:0', 'num_mentions': -2.002836448541433}, {'date': '2019-01-13 0:00:0', 'num_mentions': -2.101333770620716}, {'date': '2019-01-14 0:00:0', 'num_mentions': -1.643307753650134}, {'date': '2019-01-15 0:00:0', 'num_mentions': -1.9467365947327426}, {'date': '2019-01-16 0:00:0', 'num_mentions': -2.131786840814409}, {'date': '2019-01-17 0:00:0', 'num_mentions': -2.0328960339058737}, {'date': '2019-01-18 0:00:0', 'num_mentions': -1.3729294325276107}, {'date': '2019-01-19 0:00:0', 'num_mentions': -0.39556643836182837}, {'date': '2019-01-20 0:00:0', 'num_mentions': 0.29160442030545985}, {'date': '2019-01-21 0:00:0', 'num_mentions': -0.2192269085213404}, {'date': '2019-01-22 0:00:0', 'num_mentions': -0.8980539890040554}, {'date': '2019-01-23 0:00:0', 'num_mentions': -1.8654891141449577}, {'date': '2019-01-24 0:00:0', 'num_mentions': -2.7717476223451523}, {'date': '2019-01-25 0:00:0', 'num_mentions': -2.674220268981112}]}, {'synonym': 'samsung', 'mentions': [{'date': '2018-11-27 0:00:0', 'num_mentions': 0.003208331171069334}, {'date': '2018-11-28 0:00:0', 'num_mentions': 0.6935558074185784}, {'date': '2018-11-29 0:00:0', 'num_mentions': 0.7801704755069578}, {'date': '2018-11-30 0:00:0', 'num_mentions': -0.0756901140535976}, {'date': '2018-12-01 0:00:0', 'num_mentions': 0.04778223262425707}, {'date': '2018-12-02 0:00:0', 'num_mentions': 0.6234636128670675}, {'date': '2018-12-03 0:00:0', 'num_mentions': 0.2764565730281259}, {'date': '2018-12-04 0:00:0', 'num_mentions': -0.5138699447139403}, {'date': '2018-12-05 0:00:0', 'num_mentions': -0.3169660902837871}, {'date': '2018-12-06 0:00:0', 'num_mentions': -0.8715716464625844}, {'date': '2018-12-07 0:00:0', 'num_mentions': -0.6243877467810718}, {'date': '2018-12-08 0:00:0', 'num_mentions': -1.0901036719160306}, {'date': '2018-12-09 0:00:0', 'num_mentions': -1.3104596272287683}, {'date': '2018-12-10 0:00:0', 'num_mentions': -1.805098611804178}, {'date': '2018-12-11 0:00:0', 'num_mentions': -2.3807140158329743}, {'date': '2018-12-12 0:00:0', 'num_mentions': -3.3691102388131107}, {'date': '2018-12-13 0:00:0', 'num_mentions': -4.2304244231146715}, {'date': '2018-12-14 0:00:0', 'num_mentions': -4.382567364237026}, {'date': '2018-12-15 0:00:0', 'num_mentions': -3.472490678988841}, {'date': '2018-12-16 0:00:0', 'num_mentions': -4.062478675222423}, {'date': '2018-12-17 0:00:0', 'num_mentions': -4.300998231866813}, {'date': '2018-12-18 0:00:0', 'num_mentions': -3.7528527589837237}, {'date': '2018-12-19 0:00:0', 'num_mentions': -3.5197043764430607}, {'date': '2018-12-20 0:00:0', 'num_mentions': -2.8487107387265915}, {'date': '2018-12-21 0:00:0', 'num_mentions': -2.596040513975848}, {'date': '2018-12-22 0:00:0', 'num_mentions': -3.440939416247808}, {'date': '2018-12-23 0:00:0', 'num_mentions': -4.195416957442122}, {'date': '2018-12-24 0:00:0', 'num_mentions': -3.755171065893719}, {'date': '2018-12-25 0:00:0', 'num_mentions': -4.106333560939652}, {'date': '2018-12-26 0:00:0', 'num_mentions': -4.074762183344941}, {'date': '2018-12-27 0:00:0', 'num_mentions': -4.081952915035982}, {'date': '2018-12-28 0:00:0', 'num_mentions': -4.487789612169335}, {'date': '2018-12-29 0:00:0', 'num_mentions': -3.9632376063793684}, {'date': '2018-12-30 0:00:0', 'num_mentions': -4.4131539270650615}, {'date': '2018-12-31 0:00:0', 'num_mentions': -4.613536570416147}, {'date': '2019-01-01 0:00:0', 'num_mentions': -5.250408760529028}, {'date': '2019-01-02 0:00:0', 'num_mentions': -5.091395397328362}, {'date': '2019-01-03 0:00:0', 'num_mentions': -5.281407478275531}, {'date': '2019-01-04 0:00:0', 'num_mentions': -5.484614011455871}, {'date': '2019-01-05 0:00:0', 'num_mentions': -5.430513238710227}, {'date': '2019-01-06 0:00:0', 'num_mentions': -6.416754852556962}, {'date': '2019-01-07 0:00:0', 'num_mentions': -6.571965096658979}, {'date': '2019-01-08 0:00:0', 'num_mentions': -5.6067706050926365}, {'date': '2019-01-09 0:00:0', 'num_mentions': -6.127031181111233}, {'date': '2019-01-10 0:00:0', 'num_mentions': -6.473824198346865}, {'date': '2019-01-11 0:00:0', 'num_mentions': -5.809628129549976}, {'date': '2019-01-12 0:00:0', 'num_mentions': -6.003824851195348}, {'date': '2019-01-13 0:00:0', 'num_mentions': -6.5644109821362155}, {'date': '2019-01-14 0:00:0', 'num_mentions': -6.130716785395479}, {'date': '2019-01-15 0:00:0', 'num_mentions': -5.957854085371321}, {'date': '2019-01-16 0:00:0', 'num_mentions': -6.155193324039118}, {'date': '2019-01-17 0:00:0', 'num_mentions': -5.340899873621863}, {'date': '2019-01-18 0:00:0', 'num_mentions': -6.21913639925346}, {'date': '2019-01-19 0:00:0', 'num_mentions': -5.643878661120337}, {'date': '2019-01-20 0:00:0', 'num_mentions': -5.283343475441121}, {'date': '2019-01-21 0:00:0', 'num_mentions': -5.16656942183002}, {'date': '2019-01-22 0:00:0', 'num_mentions': -5.873235086705675}, {'date': '2019-01-23 0:00:0', 'num_mentions': -5.04002339763727}, {'date': '2019-01-24 0:00:0', 'num_mentions': -4.521716366988381}, {'date': '2019-01-25 0:00:0', 'num_mentions': -3.896450053400492}]}, {'synonym': 'google', 'mentions': [{'date': '2018-11-27 0:00:0', 'num_mentions': 0.48142012145110946}, {'date': '2018-11-28 0:00:0', 'num_mentions': -0.42978289626635113}, {'date': '2018-11-29 0:00:0', 'num_mentions': -1.173377615480748}, {'date': '2018-11-30 0:00:0', 'num_mentions': -1.5366034914137736}, {'date': '2018-12-01 0:00:0', 'num_mentions': -2.2467236569526063}, {'date': '2018-12-02 0:00:0', 'num_mentions': -1.49430026579947}, {'date': '2018-12-03 0:00:0', 'num_mentions': -1.349073064133123}, {'date': '2018-12-04 0:00:0', 'num_mentions': -1.3520918568548694}, {'date': '2018-12-05 0:00:0', 'num_mentions': -0.5562806067616554}, {'date': '2018-12-06 0:00:0', 'num_mentions': 0.4296481046552981}, {'date': '2018-12-07 0:00:0', 'num_mentions': 0.8054460745016117}, {'date': '2018-12-08 0:00:0', 'num_mentions': -0.18897051914087648}, {'date': '2018-12-09 0:00:0', 'num_mentions': 0.2827743217103478}, {'date': '2018-12-10 0:00:0', 'num_mentions': 0.17854448038509696}, {'date': '2018-12-11 0:00:0', 'num_mentions': -0.044654906913284}, {'date': '2018-12-12 0:00:0', 'num_mentions': -0.08170171174654872}, {'date': '2018-12-13 0:00:0', 'num_mentions': 0.06220582797969032}, {'date': '2018-12-14 0:00:0', 'num_mentions': 0.37055588648683047}, {'date': '2018-12-15 0:00:0', 'num_mentions': 0.7448593701986942}, {'date': '2018-12-16 0:00:0', 'num_mentions': 0.9554217297395591}, {'date': '2018-12-17 0:00:0', 'num_mentions': 1.500720150896972}, {'date': '2018-12-18 0:00:0', 'num_mentions': 2.4930139597592045}, {'date': '2018-12-19 0:00:0', 'num_mentions': 3.207639252556604}, {'date': '2018-12-20 0:00:0', 'num_mentions': 2.2810796119268177}, {'date': '2018-12-21 0:00:0', 'num_mentions': 2.059646490037682}, {'date': '2018-12-22 0:00:0', 'num_mentions': 1.1257575636220416}, {'date': '2018-12-23 0:00:0', 'num_mentions': 2.063874172429564}, {'date': '2018-12-24 0:00:0', 'num_mentions': 2.2857801066592462}, {'date': '2018-12-25 0:00:0', 'num_mentions': 2.85958623796546}, {'date': '2018-12-26 0:00:0', 'num_mentions': 3.5628743635247013}, {'date': '2018-12-27 0:00:0', 'num_mentions': 4.009857514366449}, {'date': '2018-12-28 0:00:0', 'num_mentions': 3.3823815500949737}, {'date': '2018-12-29 0:00:0', 'num_mentions': 3.815696586322498}, {'date': '2018-12-30 0:00:0', 'num_mentions': 4.6858314536857115}, {'date': '2018-12-31 0:00:0', 'num_mentions': 3.826155973282435}, {'date': '2019-01-01 0:00:0', 'num_mentions': 4.2516817232646}, {'date': '2019-01-02 0:00:0', 'num_mentions': 3.3354738318225623}, {'date': '2019-01-03 0:00:0', 'num_mentions': 2.614585548144424}, {'date': '2019-01-04 0:00:0', 'num_mentions': 3.523246891655203}, {'date': '2019-01-05 0:00:0', 'num_mentions': 3.3033448511289603}, {'date': '2019-01-06 0:00:0', 'num_mentions': 3.867310010714969}, {'date': '2019-01-07 0:00:0', 'num_mentions': 3.641914013956224}, {'date': '2019-01-08 0:00:0', 'num_mentions': 3.1883634199783755}, {'date': '2019-01-09 0:00:0', 'num_mentions': 4.060283201512003}, {'date': '2019-01-10 0:00:0', 'num_mentions': 3.307690940621401}, {'date': '2019-01-11 0:00:0', 'num_mentions': 3.88981039532877}, {'date': '2019-01-12 0:00:0', 'num_mentions': 4.246987906366171}, {'date': '2019-01-13 0:00:0', 'num_mentions': 4.910676079524355}, {'date': '2019-01-14 0:00:0', 'num_mentions': 5.903366705679416}, {'date': '2019-01-15 0:00:0', 'num_mentions': 6.6868493743371165}, {'date': '2019-01-16 0:00:0', 'num_mentions': 7.269346211036471}, {'date': '2019-01-17 0:00:0', 'num_mentions': 6.6337970960197445}, {'date': '2019-01-18 0:00:0', 'num_mentions': 6.039658144853716}, {'date': '2019-01-19 0:00:0', 'num_mentions': 5.244602871604357}, {'date': '2019-01-20 0:00:0', 'num_mentions': 5.815814752918931}, {'date': '2019-01-21 0:00:0', 'num_mentions': 4.983683079853245}, {'date': '2019-01-22 0:00:0', 'num_mentions': 4.703909207517483}, {'date': '2019-01-23 0:00:0', 'num_mentions': 4.2857661966900285}, {'date': '2019-01-24 0:00:0', 'num_mentions': 5.136895073745913}, {'date': '2019-01-25 0:00:0', 'num_mentions': 4.835244537764692}]}, {'synonym': 'dsb', 'mentions': [{'date': '2018-11-27 0:00:0', 'num_mentions': -0.31234474743867535}, {'date': '2018-11-28 0:00:0', 'num_mentions': 0.05754295644343588}, {'date': '2018-11-29 0:00:0', 'num_mentions': 0.37851600943465613}, {'date': '2018-11-30 0:00:0', 'num_mentions': -0.5676350085004198}, {'date': '2018-12-01 0:00:0', 'num_mentions': 0.1659767161603095}, {'date': '2018-12-02 0:00:0', 'num_mentions': -0.5495905111975203}, {'date': '2018-12-03 0:00:0', 'num_mentions': -0.23574877280327278}, {'date': '2018-12-04 0:00:0', 'num_mentions': -1.0107051563590344}, {'date': '2018-12-05 0:00:0', 'num_mentions': -2.0093845086640267}, {'date': '2018-12-06 0:00:0', 'num_mentions': -2.5584890789585084}, {'date': '2018-12-07 0:00:0', 'num_mentions': -3.0029831800787568}, {'date': '2018-12-08 0:00:0', 'num_mentions': -2.661239406543379}, {'date': '2018-12-09 0:00:0', 'num_mentions': -2.5538277649003556}, {'date': '2018-12-10 0:00:0', 'num_mentions': -2.8226615405849236}, {'date': '2018-12-11 0:00:0', 'num_mentions': -3.730022239220093}, {'date': '2018-12-12 0:00:0', 'num_mentions': -2.8137340869667447}, {'date': '2018-12-13 0:00:0', 'num_mentions': -3.72776668944059}, {'date': '2018-12-14 0:00:0', 'num_mentions': -3.3027842844061612}, {'date': '2018-12-15 0:00:0', 'num_mentions': -3.661912752059346}, {'date': '2018-12-16 0:00:0', 'num_mentions': -4.238788466823481}, {'date': '2018-12-17 0:00:0', 'num_mentions': -4.650345484995813}, {'date': '2018-12-18 0:00:0', 'num_mentions': -4.546016338210384}, {'date': '2018-12-19 0:00:0', 'num_mentions': -4.871719948485389}, {'date': '2018-12-20 0:00:0', 'num_mentions': -4.508800149827795}, {'date': '2018-12-21 0:00:0', 'num_mentions': -4.604074646988003}, {'date': '2018-12-22 0:00:0', 'num_mentions': -5.135435718624545}, {'date': '2018-12-23 0:00:0', 'num_mentions': -6.110530469082459}, {'date': '2018-12-24 0:00:0', 'num_mentions': -6.040368764137825}, {'date': '2018-12-25 0:00:0', 'num_mentions': -5.73062419933414}, {'date': '2018-12-26 0:00:0', 'num_mentions': -5.339407717938559}, {'date': '2018-12-27 0:00:0', 'num_mentions': -6.336289879607396}, {'date': '2018-12-28 0:00:0', 'num_mentions': -6.400445923597382}, {'date': '2018-12-29 0:00:0', 'num_mentions': -6.157568799697947}, {'date': '2018-12-30 0:00:0', 'num_mentions': -6.003317161221884}, {'date': '2018-12-31 0:00:0', 'num_mentions': -5.571548847376492}, {'date': '2019-01-01 0:00:0', 'num_mentions': -6.332674284675533}, {'date': '2019-01-02 0:00:0', 'num_mentions': -7.106979387192247}, {'date': '2019-01-03 0:00:0', 'num_mentions': -7.902360099266013}, {'date': '2019-01-04 0:00:0', 'num_mentions': -8.194149706658962}, {'date': '2019-01-05 0:00:0', 'num_mentions': -8.31072331390535}, {'date': '2019-01-06 0:00:0', 'num_mentions': -8.55243226523645}, {'date': '2019-01-07 0:00:0', 'num_mentions': -9.016001477642371}, {'date': '2019-01-08 0:00:0', 'num_mentions': -9.314664276663285}, {'date': '2019-01-09 0:00:0', 'num_mentions': -8.76807533031387}, {'date': '2019-01-10 0:00:0', 'num_mentions': -8.890369747624291}, {'date': '2019-01-11 0:00:0', 'num_mentions': -8.43909300611377}, {'date': '2019-01-12 0:00:0', 'num_mentions': -7.859826018386165}, {'date': '2019-01-13 0:00:0', 'num_mentions': -8.19365897844902}, {'date': '2019-01-14 0:00:0', 'num_mentions': -8.041787911397957}, {'date': '2019-01-15 0:00:0', 'num_mentions': -8.753429494742946}, {'date': '2019-01-16 0:00:0', 'num_mentions': -8.55027545045045}, {'date': '2019-01-17 0:00:0', 'num_mentions': -9.405434596944614}, {'date': '2019-01-18 0:00:0', 'num_mentions': -8.73068171126457}, {'date': '2019-01-19 0:00:0', 'num_mentions': -9.074528040875819}, {'date': '2019-01-20 0:00:0', 'num_mentions': -9.772100041253987}, {'date': '2019-01-21 0:00:0', 'num_mentions': -9.223505977799396}, {'date': '2019-01-22 0:00:0', 'num_mentions': -8.357295623761013}, {'date': '2019-01-23 0:00:0', 'num_mentions': -7.55697526421164}, {'date': '2019-01-24 0:00:0', 'num_mentions': -8.388090519365447}, {'date': '2019-01-25 0:00:0', 'num_mentions': -8.013416293058057}]}];
