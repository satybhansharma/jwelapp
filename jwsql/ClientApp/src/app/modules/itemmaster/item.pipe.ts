import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'item'
})
export class ItemPipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    let data = [];
    //Search Based on Unit Keyword
    try {
      data = items.filter(x => x.idesc.includes(searchText));
      if (data.length > 0) {
        return data;
      }
     
    } catch (e) {

    }
    // return items.filter(x => x.unitId1Name.includes(searchText));
    return data;

  }

}
