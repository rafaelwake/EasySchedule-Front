import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
})
export class SchedulingComponent implements OnInit {
  currentMonthYear: string;

  constructor() {
    this.currentMonthYear = '';
  }

  ngOnInit(): void {
    this.currentMonthYear = this.getCurrentMonthYear();
  }

  getCurrentMonthYear(): string {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return `${month} ${year}`;
  }
}
