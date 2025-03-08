export class SlideModel {
    id: string | null;
    url: string;
    created: string;
    createdBy: string;

    constructor(id: string | null, url: string, created: string, createdBy: string) {
        this.id = id;
        this.url = url;
        this.created = created;
        this.createdBy = createdBy
    }
}