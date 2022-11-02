import { Component, OnInit } from '@angular/core';
import { AlarmMultimediaService } from 'src/app/service/alarm-multimedia.service';
import { RecurrentAlarmService } from 'src/app/service/recurrent-alarm.service';

@Component({
  selector: 'app-recurrent-alarm',
  templateUrl: './recurrent-alarm.component.html',
  styleUrls: ['./recurrent-alarm.component.scss']
})
export class RecurrentAlarmComponent implements OnInit {

  recurrentActionSetted: number = 0;

  recurrentAction: number = 0;
  recurrentActionMinute: number = 0;

  constructor( 
    private recurrentAlarmService: RecurrentAlarmService,
    private alarmMultimediaService: AlarmMultimediaService
     ) { }

  ngOnInit(): void {
    this.recurrentAlarmService.recurrentValidation.subscribe( () => {
      this.recurrentAlarm();
    })
  }

  recurrentAlarm() {
    if(this.recurrentActionSetted !== 0){
      this.recurrentAction += 1;
      if (this.recurrentAction === 60) {
        this.recurrentAction = 0;
        this.recurrentActionMinute =+ 1;
      }
      if(this.recurrentActionMinute >= this.recurrentActionSetted) {
        this.recurrentActionMinute = 0;
        const audio = new Audio(this.alarmMultimediaService.alarmMultimediaObj());
        audio.play();
      }
    }
  }

}
