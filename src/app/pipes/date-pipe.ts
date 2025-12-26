import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasOferta',
})
export class OfertaPipe implements PipeTransform {
  transform(fechaAlta: string, diasOferta: number): string {
    if (fechaAlta === null || diasOferta === null || isNaN(diasOferta)) {
      return fechaAlta;
    }

    const FechaActual = new Date(fechaAlta);

    const FechaFin = new Date(FechaActual);
    FechaFin.setDate(FechaActual.getDate() + diasOferta);

    return FechaFin.toLocaleDateString('es-AR');
  }
}
