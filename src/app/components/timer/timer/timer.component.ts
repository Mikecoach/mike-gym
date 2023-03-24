import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timerForm = this.fb.group({
    prepare:          [0, [Validators.required, Validators.pattern('[0-9]*')]],
    work:             [0, [Validators.required, Validators.pattern('[0-9]*')]],
    rest:             [0, [Validators.required, Validators.pattern('[0-9]*')]],
    cycles:           [0, [Validators.required, Validators.pattern('[0-9]*')]],
    sets:             [0, [Validators.required, Validators.pattern('[0-9]*')]],
    restBetweenSets:  [0, [Validators.required, Validators.pattern('[0-9]*')]],
    coolDown:         [0, [Validators.required, Validators.pattern('[0-9]*')]],
  });

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
  cyclesPercentages:number=0;
  setsPercentages:number=0;

  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  constructor(private fb: FormBuilder) 
  {
  }

  ngOnInit(): void {
  }

  /**
   * Start job
   */
  async start() {
    let cyclePercentage:number = 100/(this.cycles*this.sets);
    let setsPercentage:number = 100/this.sets;

    //Prepare
    await this.timer("Preparación", this.prepare);
    //Sets
    for (let index = 1; index <= this.sets; index++) {
      this.setsPercentages+=setsPercentage;
      //Cicles
      for (let index = 1; index <= this.cycles; index++) {
        this.cyclesPercentages+=cyclePercentage;
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