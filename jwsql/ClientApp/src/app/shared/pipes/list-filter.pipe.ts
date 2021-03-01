import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  constructor(private _localStorage:LocalStorageService) {

  }
  transform(items: any, filter: any, defaultFilter: boolean): any {
    items = this._localStorage.get_Cname();
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
