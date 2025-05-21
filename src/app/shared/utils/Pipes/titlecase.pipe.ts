import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase',
  standalone: true,
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    value = value.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
