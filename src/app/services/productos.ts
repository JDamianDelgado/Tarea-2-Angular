import { Injectable } from '@angular/core';
import { ProductoInterface } from '../Models/productos.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductosMock } from '../Mock/Productos.mock';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private inicial: ProductoInterface[] = ProductosMock;

  private productosSubject = new BehaviorSubject<ProductoInterface[]>([...this.inicial]);
  private nextId = Math.max(...this.inicial.map((product) => product.id)) + 1;

  constructor() {}

  getproductos(): Observable<ProductoInterface[]> {
    return this.productosSubject.asObservable();
  }

  addProducto(producto: Partial<ProductoInterface>) {
    const productosActuales = this.productosSubject.getValue();
    const new_id = this.nextId++;
    const newProducto: ProductoInterface = {
      id: new_id,
      nombre: producto.nombre || '',
      precio: producto.precio ?? 0,
      descripcion: producto.descripcion || '',
      imagenUrl: producto.imagenUrl || '',
      fechaAlta: producto.fechaAlta || new Date().toISOString(),
    };
    this.productosSubject.next([...productosActuales, newProducto]);
  }

  deleteProducto(id: number) {
    const productosFiltrados = this.productosSubject
      .getValue()
      .filter((product) => product.id !== id);
    this.productosSubject.next(productosFiltrados);
  }

  reset() {
    this.productosSubject.next([...ProductosMock]);

    this.nextId = Math.max(...ProductosMock.map((product: ProductoInterface) => product.id)) + 1;
  }
}
