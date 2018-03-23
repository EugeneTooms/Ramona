export class Artikal{
    constructor(public id : number,
                public barcode : number,
                public naziv : string,
                public poreznaGrupa? : string,
                public grupaPrikaza? : string,
                public jedinica? : string,
                public prodajnaCijena? : number,
                public nabavnaCijena? : number,
                public naknada? : number,
                public kalo? : number,
                public img? : string,
                ) {}
}