import { Article } from "./article.model";

export class Inventura{
    constructor(public id : number,
                public datum : string, 
                public articles : Article[]
                ) {}
}