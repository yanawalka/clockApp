import { Component, OnInit } from '@angular/core';
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

  constructor( private recurrentAlarmService: RecurrentAlarmService ) { }

  ngOnInit(): void {
    this.recurrentAlarmService.recurrentValidation.subscribe( () => {
      console.log("Entro a vagancia")
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
        console.log("deberia sonar la alarma")
        // const audio = new Audio(this.alarmMultimediaObj());
        // audio.play();
      }
    }
  }

}
