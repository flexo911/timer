import {Component} from '@angular/core';
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  public time:number = 0;
  public interval = interval(1000);
  public CurrentTime = '00:00:00'
  public status = 1;

  public ClickTimer: number = 0;
  private alive: Subject<void> = new Subject<void>();

  formatTime():void{

    let hour = Math.floor(this.time / (3600))
    let minute = Math.floor(this.time % (3600) / 60)
    let second = Math.floor(this.time % 60)
    let hourFormat = (hour)<10 ? '0'+ hour.toString() : hour.toString()
    let minuteFormat = (minute)<10 ? '0'+ minute.toString() : minute.toString()
    let secondFormat  = (second)<10 ? '0'+ second.toString() : second.toString()
    this.CurrentTime = `${hourFormat}:${minuteFormat}:${secondFormat}`;

  }

  startTimer(){

    if(this.status == 1) {
      this.status = 2;

      this.interval
        .pipe(takeUntil(this.alive))
        .subscribe((e) => {
          this.time++
          this.formatTime()
          return e;
        });

    } else{

      this.status = 1
      this.alive.next()
      this.time = 0

    }

  }

  pause() {

    this.ClickTimer++;
    setTimeout(() => {
      if (this.ClickTimer === 2) {
        this.alive.next()
        this.status = 1
      }
      this.ClickTimer = 0;
    }, 300)

  }

  reset(){

    this.status = 1
    this.alive.next()
    this.CurrentTime = '00:00:00'
    this.time = 0
    this.startTimer()

  }





}
