export class ReminderModel {
    id: string | null;
    title: string;
    description: string;
    startDate: Date;
    expiryDate: Date;

    constructor(id: string | null = null, title: string, description: string, startDate: Date, expiryDate: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.expiryDate = expiryDate;
    }

}