import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Color, Label } from 'ng2-charts';
import { NGXLogger } from 'ngx-logger';
import { Reader } from 'src/app/common/reader.dto';
import { ReaderService } from 'src/app/reader/reader.service';

interface ReaderAnalysis {
  week: string;
  readerCount: number;
}

@Component({
  selector: 'app-reader-analysis',
  templateUrl: './reader-analysis.component.html',
  styleUrls: ['./reader-analysis.component.css']
})
export class ReaderAnalysisComponent implements OnInit, OnChanges {

  @Input() readerAnalysis: ReaderAnalysis[];

  topnHeader = ['Username', 'Register Date', 'Gender', 'Age', 'Read Score', 'Read Times', 'Read Duration'];
  topnData = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Reader Quantity' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];


  constructor(
    private logger: NGXLogger,
    private readerService: ReaderService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.readerService.getTopN(10).subscribe((readerList: Reader[]) => {
      if (readerList && readerList.length > 0) {
        this.topnData = readerList.map((item)=>{
          const regDate = this.datePipe.transform(item.registerDate, 'y-MM-dd');
          const age = this.calAge(new Date(item.readerProfile.birthday))
          return [
            item.username, 
            regDate, 
            item.readerProfile.gender, 
            age, 
            item.readerProfile.score, 
            item.readerProfile.readTimes, 
            item.readerProfile.readDuration,
          ];
        })
        this.logger.info('Success get topN reader list from server');
      }
    })
  }

  ngOnChanges() {
    if (this.readerAnalysis) {
      const labelList = this.readerAnalysis.map((item) => item.week);
      const dataList = this.readerAnalysis.map((item) => item.readerCount);
      this.lineChartLabels = labelList;
      this.lineChartData[0].data = dataList;
    }
  }

  calAge(birthday: Date) {
    const ageDif = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDif);
    return Math.abs(ageDate.getFullYear() - 1970);
  }

}
