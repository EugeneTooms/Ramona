export class Article{
    constructor(public id : number,
                public naziv? : string,
                public grupa? : string,       
                public postojece_stanje? : number,
                public doslo? : number,
                public prodano? : number,
                public novo_stanje? : number,
                public stanje? : number,
                public razlika? : number,               
                ) {}
}

/*select
	art_show_gr.naziv,
	articles.name,
	articles.id
from 
	articles, art_show_gr
where 
	articles.prikaz_group_id = art_show_gr.id 
order by 
    art_show_gr.naziv, articles.name;*/
    
    