import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { NGXLogger } from 'ngx-logger';
import { BookService } from '../../book/book.service';

interface BookInventory {
  category: string;
  count: number;
}

@Component({
  selector: 'app-inventory-summary',
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.css']
})
export class InventorySummaryComponent implements OnInit, OnChanges {

  @Input() bookSummary: BookInventory[];

  //Barchart configuration
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, max: 10 } }] },
    title: {
      text: 'Book Quantity Summary',
      fontSize: 24,
      fontFamily: 'Arial',
      display: true,
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Romance', 'Politics', 'Press', 'Essay', 'IT', 'Comic', 'History', 'Geography', 'Dissertation', 'Art', 'Sport'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Book Quantity' },
  ];

  //PieChart configuration
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'Book Distribution by Category ',
      fontSize: 24,
      fontFamily: 'Arial',
      display: true,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return value;
        },
        anchor: 'end',
      },
    }
  };
  public pieChartLabels: Label[] = ['Romance', 'Politics', 'Press', 'Essay', 'IT', 'Comic', 'History', 'Geography', 'Dissertation', 'Art', 'Sport'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];

  constructor(
    private logger: NGXLogger,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.bookSummary.length > 0) {
      const labelList = this.bookSummary.map((item)=>item.category);
      const dataList = this.bookSummary.map((item)=>item.count);
      this.barChartLabels = labelList;
      this.barChartData[0].data = dataList;
      this.pieChartLabels = labelList;
      this.pieChartData = dataList;
      const maxCount = Math.max(...dataList);
      const minCount = Math.min(...dataList);
      this.barChartOptions.scales.yAxes[0].ticks.min = minCount > 5 ? minCount - 5 : 0;
      this.barChartOptions.scales.yAxes[0].ticks.max = maxCount + 1;
    }
  }

}
