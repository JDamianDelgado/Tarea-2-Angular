import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
  standalone: true,
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, porcentaje: number): number {
    if (precio === null || isNaN(precio) || porcentaje === null || isNaN(porcentaje)) {
      return precio;
    }
    const precioFinal = precio - (precio * porcentaje) / 100;
    return Math.round(precioFinal * 100) / 100;
  }
}
