export class SlideModel {
    id: string | null;
    url: string;

    constructor(id: string | null, url: string) {
        this.id = id;
        this.url = url
    }
}