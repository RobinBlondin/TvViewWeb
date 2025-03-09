export class SlideModel {
    id: string | null;
    url: string;
    created: string | null;
    createdBy: string | null;

    constructor(id: string | null, url: string, created: string | null, createdBy: string | null) {
        this.id = id;
        this.url = url;
        this.created = created;
        this.createdBy = createdBy
    }
}