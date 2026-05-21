package gm.inventarios.controlador;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gm.inventarios.modelo.Producto;
import gm.inventarios.servicio.IProductoServicio;

@RestController
@RequestMapping ("/inventario-app") //http://localhost: 8080/inventarios-app
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoControlador {

    private final IProductoServicio productoServicio;

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    public ProductoControlador(IProductoServicio productoServicio){
        this.productoServicio = productoServicio;
    }

    //LISTAR TODOS LOS PRODUCTOS
    @GetMapping
    public List<Producto> listarProductos(){
        List<Producto> productos = productoServicio.listarProductos() ;
        logger.info("Productos Obtenidos: ");
        productos.forEach(producto -> logger.info(producto.toString()));
        return productos;
    }

    @GetMapping("/{id}")
    public Producto buscarProductoPorId(@PathVariable Integer id){
        return productoServicio.buscarProductoPorId(id);
    }

    @PostMapping
    public Producto guardarProducto(@RequestBody Producto producto){
        return productoServicio.guardarProductos(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Integer id, @RequestBody Producto producto){
        producto.setIdProducto(id);
        return productoServicio.guardarProductos(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Integer id){
        productoServicio.eliminarProductoPorId(id);

    }
}
