import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  //Labels
  step: string = "";
  time: number = 0;

  //Time
  prepare: number = 5;
  work: number = 3;
  rest: number = 5;
  cycles: number = 2;
  sets: number = 2;
  restBetweenSets: number = 6;
  coolDown: number = 20;

  //Percentages
  setsPercentages:number=0;

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  ngOnInit(): void {
    this.start();
  }

  /**
   * Start job
   */
  async start() {
    let setsPercentage:number = 100/this.sets;

    //Prepare
    await this.timer("Preparación", this.prepare);
    //Sets
    for (let index = 1; index <= this.sets; index++) {
      this.setsPercentages+=setsPercentage;
      //Cicles
      for (let index = 1; index <= this.cycles; index++) {
        //Work
        await this.timer("Ciclo " + index + " - Trabajo", this.work);
        //Rest
        if (index < this.cycles) {
          await this.timer("Ciclo #" + index + " - Descanso", this.rest);
        }
      }
      //Rest between sets
      if (index < this.sets) {
        await this.timer("Descanso entre set #" + index, this.restBetweenSets);
      }
    }
    //Cool down
    await this.timer("Descanso final", this.coolDown);
  }

  /**
   * Timer count
   * @param title step title
   * @param time seconds
   */
  async timer(title: string, time: number) {
    this.step = title;
    this.time = time;
    while (this.time > 0) {
      await this.sleep(1000);
      this.time--;
    }
  }
}