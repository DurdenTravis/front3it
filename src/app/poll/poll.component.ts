import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { KindMusicEnum, KindTypeLabelMapping } from '../enum/kindMusicEnum';
import { Poll } from '../models/poll';
import { PollRequest } from '../models/pollRequest';
import { ApiRestService } from '../services/api-rest.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements AfterContentInit{

  polls: Poll[] = [];
  dataPoints:any = [];
  showChart: boolean = false;
  musicTypes = Object.values(KindMusicEnum);
  KindTypeLabelMapping = KindTypeLabelMapping;
  errores: string[] = [];
  email: string = "";
  kindMusic: string = "";
  constructor(private apiRestService: ApiRestService,) {

  }  

  pollChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Resultado Encuesta hasta el momento',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    data: [
      {
        type: 'pie',
        dataPoints: this.dataPoints,
      },
    ],
  }

  postPoll(){
    var poll: PollRequest = {
      email: this.email,
      kindMusic: this.kindMusic,
     
    }
    this.apiRestService.createPoll(poll)
    .subscribe(
      poll => {
        console.log("Creando poll");
        this.showChart = true;
      },
      err => {
        this.errores = err.error.errors as string[];
        Swal.fire({
          title: err.error.error || JSON.stringify(err),
          icon: 'error'
        });
    
      }
    );
  }

  ngAfterContentInit() {
    this.apiRestService.getPollsPercents().subscribe(response => {
      this.polls = response as Poll[];
      for (let i = 0; i < this.polls.length; i++) {
        this.dataPoints.push({
          label: this.polls[i].kindMusic,
          y: this.polls[i].percent,
        })    
      }
    },
      err => {
        Swal.fire({
          title: err.message || JSON.stringify(err),
          icon: 'error'
        });
      })   

  }






}
