import { Injectable } from '@angular/core';
import { AlarmSounds } from 'src/enum/alarmSoundsEnum';
import { AlarmMultimediaInterface } from 'src/interface/alarmMultimedia.interface';

@Injectable({
  providedIn: 'root'
})
export class AlarmMultimediaService {

  alarmMultimedia: AlarmMultimediaInterface[] = Object.values(AlarmSounds);

  alarmMultimediaObj(): string {
    return this.alarmMultimedia.find(element => element.seted === true)?.url??"";
  }

  setAlarmSound(ev: any) {
    this.alarmMultimedia.forEach(element => element.seted = false );
    this.alarmMultimedia[ev].seted = true;
  }

}
