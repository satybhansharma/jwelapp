import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(x=>x.unit.includes(searchText));

  }

}
