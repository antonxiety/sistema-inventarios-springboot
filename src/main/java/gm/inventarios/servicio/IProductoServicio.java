package gm.inventarios.servicio;

import gm.inventarios.modelo.Producto;
import java.util.List;
import java.util.Optional;

public interface IProductoServicio {

    List<Producto> listarProductos();
    Producto buscarProductoPorId(Integer idProducto);

    Producto guardarProductos(Producto producto);
    void eliminarProductoPorId(Integer idProducto);

    Producto actualizarExistencia(Integer idProducto, Integer nuevaExistencia);

}
