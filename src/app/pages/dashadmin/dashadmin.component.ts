import {Component} from '@angular/core';
import {DataAnalysisService} from "../../services/dataAnalysis.service";

@Component({
  selector: 'dashadmin',
  styleUrls: ['./dashadmin.scss'],
  templateUrl: './dashadmin.html'
})
export class DashboardAdmin {

  public blogChartLabels:string[] = ['新建','审核','已发布'];
  public blogChartData:number[] = [1,0,0];
  public blogChartType:string = 'doughnut';

  public recruitChartLabels:string[] = ['新建','审核','已发布'];
  public recruitChartData:number[] = [1,0,0];
  public recruitChartType:string = 'doughnut';

  constructor(private dataAnalysisService: DataAnalysisService) {


  }

  public ngOnInit():void {

   this.loadData();

  }

  public loadData(){

    //加载用户数据分析
    this.dataAnalysisService.findBlogAnalysis(null).subscribe(res => {
      if(res.successed == '00'){

        console.log(res.data);
        for(let m=0 ; m<res.data.length; m++){
          let item = res.data[m];


         if(item.busiId === 0){
           this.blogChartData[0] = item.count;
         }else if(item.busiId === 1){
           this.blogChartData[1] = item.count;
         }else if(item.busiId === 2){
           this.blogChartData[2] = item.count;
         }

        }

      }
    },
      err => {console.log('ERROR!!!')}
    );

    //加载用户数据分析
    this.dataAnalysisService.findRecruitAnalysis(null).subscribe(res => {
      if(res.successed == '00'){
        console.log(res.data);
        for(let m=0 ; m<res.data.length; m++){
          let item = res.data[m];


          if(item.busiId === 0){
            this.recruitChartData[0] = item.count;
          }else if(item.busiId === 1){
            this.recruitChartData[1] = item.count;
          }else if(item.busiId === 2){
            this.recruitChartData[2] = item.count;
          }
        }
      }

    });

  }

    // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
