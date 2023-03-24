import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timerForm = this.fb.group({
    prepare:          [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    work:             [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    rest:             [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    cycles:           [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    sets:             [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    restBetweenSets:  [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
    coolDown:         [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]*')]],
  });

  //Labels
  step: string = "";
  time: number = 0;

  //Time
  prepare: number = 0;
  work: number = 0;
  rest: number = 0;
  cycles: number = 0;
  sets: number = 0;
  restBetweenSets: number = 0;
  coolDown: number = 0;

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
    this.cyclesPercentages=0;
    this.setsPercentages=0;
    this.prepare = this.timerForm.controls['prepare'].value; 
    this.work = this.timerForm.controls['work'].value;
    this.rest = this.timerForm.controls['rest'].value;
    this.cycles = this.timerForm.controls['cycles'].value;
    this.sets = this.timerForm.controls['sets'].value;
    this.restBetweenSets = this.timerForm.controls['restBetweenSets'].value;
    this.coolDown = this.timerForm.controls['coolDown'].value;

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