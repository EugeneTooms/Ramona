import { Lokacija_Artikal } from "./lokacija_artikal.model";

export class Lokacija{
    constructor(public id : number,
                public naziv : string,
                public pozicija : string,
                public artikli? : Lokacija_Artikal[]) {}
}

//test kada promijenim radni folder i vratim se nazad u Studio Code-u