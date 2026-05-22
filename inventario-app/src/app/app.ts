import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Necesario para vincular los inputs del formulario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // Agregamos FormsModule para activar [(ngModel)]
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('inventario-app');
  private API_URL = 'http://localhost:8080/inventario-app'; // Coincide exactamente con tu @RequestMapping

  // Inyectamos el cliente HTTP de Angular
  private http = inject(HttpClient);

  // Creamos el Signal para listar los productos
  public productos = signal<any[]>([]);

  // Variables de control para el formulario y edición
  public productoEnEdicion = signal<boolean>(false);
  
  // Objeto temporal estructurado exactamente como tu clase "Producto" de Java
  public nuevoProducto = {
    idProducto: null,
    descripcion: '',
    precio: 0,
    existencia: 0
  };

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // Cargar productos (Tu método original)
  obtenerProductos(): void {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (datos) => {
        this.productos.set(datos);
        console.log('¡Productos cargados con éxito!', datos);
      },
      error: (error) => console.error('Error de conexión con el backend:', error)
    });
  }

  // ==========================================
  // LÓGICA DE LOS BOTONES AJUSTADA A TU BACKEND
  // ==========================================

  // BOTÓN AGREGAR (Mapea con tu @PostMapping)
  agregarProducto(): void {
    if (!this.nuevoProducto.descripcion || this.nuevoProducto.precio <= 0) {
      alert('Por favor, rellena los campos correctamente.');
      return;
    }

    // Enviamos el objeto con la estructura exacta que espera tu modelo en @RequestBody
    this.http.post(this.API_URL, this.nuevoProducto).subscribe({
      next: () => {
        console.log('Producto guardado correctamente en la Base de Datos.');
        this.obtenerProductos(); // Refrescar la tabla
        this.limpiarFormulario();
      },
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  // BOTÓN EDITAR EN LA TABLA: Carga el producto en el formulario
  // BOTÓN EDICIÓN (TABLA): Pasa los datos del producto al formulario
  seleccionarParaEditar(producto: any): void {
    alert('¡Clic detectado en Editar para el producto: ' + producto.descripcion);
    this.productoEnEdicion.set(true);
    this.nuevoProducto = { ...producto }; 
  }

  // BOTÓN GUARDAR CAMBIOS (Mapea con tu @PutMapping("/{id}"))
  guardarCambios(): void {
    if (!this.nuevoProducto.idProducto) return;

    // CORRECCIÓN: Mandamos el idProducto directamente en la URL para que lo atrape tu @PathVariable Integer id
    const id = this.nuevoProducto.idProducto;
    
    this.http.put(`${this.API_URL}/${id}`, this.nuevoProducto).subscribe({
      next: () => {
        console.log('Producto actualizado correctamente en la Base de Datos.');
        this.obtenerProductos(); // Refrescar la tabla
        this.cancelarEdicion();
      },
      error: (err) => console.error('Error al actualizar producto:', err)
    });
  }

  // BOTÓN ELIMINAR EN LA TABLA (Mapea con tu @DeleteMapping("/{id}"))
  eliminarProducto(idProducto: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      // CORRECCIÓN: Mandamos el id del producto directo a la URL de Spring Boot
      this.http.delete(`${this.API_URL}/${idProducto}`).subscribe({
        next: () => {
          console.log('Producto eliminado de la Base de Datos.');
          this.obtenerProductos(); // Refrescar la tabla
        },
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }

  // Métodos de limpieza
  cancelarEdicion(): void {
    this.productoEnEdicion.set(false);
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoProducto = {
      idProducto: null,
      descripcion: '',
      precio: 0,
      existencia: 0
    };
  }
}