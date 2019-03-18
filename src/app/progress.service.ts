import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  readonly progress = new Subject<boolean>();

  startProgress(): void {
    this.progress.next(true);
  }

  stopProgress(): void {
    this.progress.next(false);
  }
}
