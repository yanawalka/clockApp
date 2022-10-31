export interface AlarmInterface {
  hour: string,
  minute: string,
  second: string,
  date: string
}

export interface ScheduledAlarmInterface extends Array<AlarmInterface>{}