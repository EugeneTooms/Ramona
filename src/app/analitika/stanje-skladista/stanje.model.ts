export class Stanje{
    constructor(public id : number,
                public name : string,
                public grupa : string,
                public prije : number,
                public ulazi? : number,
                public prodaja? : number,
                public otpisi? : number,
                public poslije? : number,
                public razlika? : number,
                public razlika_postotak? : number) {}
}