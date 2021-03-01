import { Pipe, PipeTransform } from '@angular/core';
import { KeyName } from 'ag-grid-community';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {

  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter) {
      let record = items;
      return items;
    }
    if (!Array.isArray(items)) {
      return items;
    }
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (defaultFilter) {
        return items.filter(item =>
          filterKeys.reduce((x, KeyName) =>
            (x && new RegExp(filter[KeyName], 'gi').test(item[KeyName])) ||
            filter[KeyName] == "", true));
      }
      else {
        return items.filter(item => {
          return filterKeys.some((KeyName) => {
            return new RegExp(filter[KeyName], 'gi').test(item[KeyName]) ||
              filter[KeyName] == "";
          });
        });

      }
     
    }
   
  }

}
