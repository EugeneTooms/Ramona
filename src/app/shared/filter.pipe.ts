import { Pipe, PipeTransform, Injectable  } from "@angular/core";

@Pipe({
    name : 'filter',
    pure : false
})
@Injectable()
export class FilterPipe implements PipeTransform{
    transform(items: any[], field: string, value: any): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }
        if (typeof value === 'number'){
            return items.filter(singleItem => singleItem[field] === value);
        }else{
            return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
        }
    }
}

