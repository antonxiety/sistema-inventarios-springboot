package gm.inventarios.servicio;

import gm.inventarios.modelo.Producto;
import gm.inventarios.repositorios.ProductoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional

public class ProductoServicio implements IProductoServicio {

    private final ProductoRepositorio productoRepositorio;

    public ProductoServicio(ProductoRepositorio productoRepositorio){
        this.productoRepositorio = productoRepositorio;

    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> listarProductos(){
        return productoRepositorio.findAll();
    }

    @Override

    public Producto buscarProductoPorId(Integer idProducto){
        return productoRepositorio.findById(idProducto).orElse(null);
    }

    @Override
    public Producto guardarProductos(Producto producto){
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProductoPorId(Integer idProducto){
        if(!productoRepositorio.existsById(idProducto)){
            throw new NoSuchElementException("No existe producto con id: "+idProducto);
    }
        productoRepositorio.deleteById(idProducto);
    }

    @Override
    public Producto actualizarExistencia(Integer idProducto, Integer nuevaExistencia) {
        return null;
    }
}
