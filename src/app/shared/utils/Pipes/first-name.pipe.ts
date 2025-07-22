import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
  standalone: true,
})
export class FirstNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    const partes = value.split(' ');
    if (partes.length < 3) return value;
    const [apellido1, apellido2, nombre] = partes;
    return nombre; // retorna solo el primer nombre
  }
}
