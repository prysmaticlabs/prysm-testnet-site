import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { takeWhile, map, startWith, takeUntil } from 'rxjs/operators';

export interface IInterval {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }

  getCountDown(timeToGo: number): Observable<IInterval> {
    return interval(1000).pipe(
      startWith(0),
      map(
        _ =>  this.getIntervalTime(timeToGo, Date.now())
      ),
      takeWhile((x: IInterval) => !this.isComplete(x)),
    );
  }

  private getIntervalTime(dateA: number, dateB: number): IInterval {
    let intervalTime: number = Math.floor((dateA - dateB) / 1000);
    return this.getTime(intervalTime);
  }

  private getTime(time : number): IInterval{
      let interval: IInterval = {days : 0, hours : 0, minutes : 0, seconds: 0};
      interval.days = Math.floor(time / 86400);
      time -= interval.days * 86400;
      interval.hours = Math.floor(time / 3600) % 24;
      time -= interval.hours * 3600;
      interval.minutes = Math.floor(time / 60) % 60;
      time -= interval.minutes * 60;
      interval.seconds = time % 60;
      return interval;
  }

  isComplete(time: IInterval): boolean {
    return time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;
  }
}
