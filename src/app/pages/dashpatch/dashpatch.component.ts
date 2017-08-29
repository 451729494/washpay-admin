import {Component} from '@angular/core';
import {DataAnalysisService} from "../../services/dataAnalysis.service";

@Component({
  selector: 'dashpatch',
  styleUrls: ['./dashpatch.scss'],
  templateUrl: './dashpatch.html'
})
export class DashboardPatch {


  constructor(private dataAnalysisService: DataAnalysisService) {


  }

  public ngOnInit():void {

   this.loadData();

  }

  public loadData(){





  }

    // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
