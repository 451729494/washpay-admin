import {Component} from '@angular/core';

import {BaThemeConfigProvider, colorHelper} from '../../../theme';


import 'easy-pie-chart/dist/jquery.easypiechart.js';

import {UserService} from "../../../services/user.service";
import {DataAnalysisService} from "../../../services/dataAnalysis.service";

@Component({
  selector: 'pie-chart-user',
  templateUrl: './pieChartUser.html',
  styleUrls: ['./pieChartUser.scss']
})
// TODO: move easypiechart to component
export class PieChartUser {

  public charts=[{
    color: this._baConfig.get().colors.custom.dashboardPieChart,
    description: '用户数',
    stats: '11',
    icon: 'person',
  }, {
    color: this._baConfig.get().colors.custom.dashboardPieChart,
    description: '在职人数',
    stats: '9',
    icon: 'face',
  }];

  private _init = false;

  private pieColor = this._baConfig.get().colors.custom.dashboardPieChart;;

  constructor(private dataAnalysisService: DataAnalysisService,private _baConfig:BaThemeConfigProvider,) {

    this.pieColor = this._baConfig.get().colors.custom.dashboardPieChart;


    //加载用户数据分析
    this.dataAnalysisService.findUserAnalysis(null).subscribe(res => {
      if(res.successed == '00'){

        for(let m=0 ; m<res.data.length; m++){
          let item = res.data[m];


          this.charts[m].description = item.name;
          this.charts[m].stats = item.count;
        }

      }
    });

    //加载资讯数量

  }

  ngAfterViewInit() {
    console.log('----');
    console.log(JSON.stringify(this.charts));

    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }


  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts-user .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
