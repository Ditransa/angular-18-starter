import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'senteceCase',
  standalone: true,
})
export class SentecePipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }
}
