export class DepartureModel {
  name: string;
  time: string;
  date: string;
  direction: string;

  constructor(name: string, time: string, date: string, direction: string) {
    this.name = name;
    this.time = time;
    this.date = date;
    this.direction = direction;
  }
}
