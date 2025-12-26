import { Component } from '@angular/core';
import { ProductoInterface } from '../../Models/productos.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos';
import { CommonModule, NgIf } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyArgToUsdPipe } from '../../pipes/currency-pipe';
import { OfertaPipe } from '../../pipes/date-pipe';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, DescuentoPipe, FormsModule, NgIf, CurrencyArgToUsdPipe, OfertaPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  productos: ProductoInterface[] = [];
  loading: boolean = true;
  agregarProducto: boolean = false;
  porcentajeDescuento: number = 10;
  cotizacionDolar = 1425;
  diasOferta = 10;
  private subscription?: Subscription;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.subscription = this.productosService.getproductos().subscribe((productos_lista) => {
      this.productos = productos_lista;
      this.loading = false;
    });
  }

  deleteProducto(id: number) {
    this.productosService.deleteProducto(id);
  }

  nuevoProducto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    imagenUrl: '',
    fechaAlta: '',
  };
  addProductoForm() {
    if (
      !this.nuevoProducto.nombre ||
      this.nuevoProducto.precio <= 0 ||
      !this.nuevoProducto.descripcion
    ) {
      alert('completa todos los campos ');
    }
    this.productosService.addProducto({
      nombre: this.nuevoProducto.nombre,
      precio: this.nuevoProducto.precio,
      descripcion: this.nuevoProducto.descripcion,
      imagenUrl:
        this.nuevoProducto.imagenUrl ||
        'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg',
      fechaAlta: this.nuevoProducto.fechaAlta.toString() || new Date().toISOString(),
    });

    this.nuevoProducto = {
      nombre: '',
      precio: 0,
      descripcion: '',
      imagenUrl: '',
      fechaAlta: '',
    };
    this.agregarProducto = false;
  }

  reset() {
    this.productosService.reset();
  }
}
