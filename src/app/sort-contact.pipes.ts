import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortContacts',
})
export class SortContactsPipe implements PipeTransform {
  transform(contacts: any[]): any[] {
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
  }
}
