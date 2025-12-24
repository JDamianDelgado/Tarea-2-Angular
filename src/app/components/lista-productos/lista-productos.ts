import { Component } from '@angular/core';
import { ProductoInterface } from '../../Models/productos.model';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';
import { ProductosMock } from '../../Mock/Productos.mock';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  productos: ProductoInterface[] = [];
  loading: boolean = true;
  agregarProducto: boolean = false;
  porcentajeDescuento: number = 10;
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

  addProducto() {
    this.productosService.addProducto({
      nombre: 'Nuevo Producto',
      precio: 19999,
      descripcion: 'Descripción del nuevo producto',
      imagenUrl: 'https://picsum.photos/300/300?random=4',
      fechaAlta: new Date().toISOString(),
    });
  }

  reset() {
    this.productosService.reset();
  }
}
