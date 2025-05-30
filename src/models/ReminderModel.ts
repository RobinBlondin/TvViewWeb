export class ReminderModel {
  id: string | null;
  description: string;
  done: boolean;

  constructor(id: string | null = null, description: string, done: boolean) {
    this.id = id;
    this.description = description;
    this.done = done;
  }
}
