import { Lokacija_Artikal } from "./lokacija_artikal.model";

export class Lokacija{
    constructor(public id : number,
                public naziv : string,
                public artikli? : Lokacija_Artikal[]) {}
}