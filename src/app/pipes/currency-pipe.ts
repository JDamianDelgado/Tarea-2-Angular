import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyArgToUsdPipe implements PipeTransform {
  transform(precio: number, cotizacionDolar: number): number | null {
    if (precio === null || isNaN(precio) || cotizacionDolar === null || isNaN(cotizacionDolar)) {
      return precio;
    }
    const valorAlCambio = precio / cotizacionDolar;
    return Number(valorAlCambio.toFixed(2));
  }
}
