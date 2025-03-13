export class ReminderModel {
    id: string | null;
    description: string;
    expiryDate: string;

    constructor(id: string | null = null, description: string, expiryDate: string) {
        this.id = id;
        this.description = description;
        this.expiryDate = expiryDate;
    }

}