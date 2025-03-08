export class CalendarEventModel {
    id: string | null;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;

    constructor(id: string | null = null, title: string, description: string, location: string, startTime: string, endTime: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}