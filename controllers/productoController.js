import { poolPromise, sql } from '../db.js';

export const guardarProducto = async (req, res) => {
  try {
    const {
      ProductoID,
      Codigobarra,
      Descripcion,
      ProveedorID,
      CategoriaID,
      UnidadID,
      MarcaID,
      Servicio,
      Status
    } = req.body;

    const pool = await poolPromise;
    const request = pool.request();

    request.input('ProductoID', sql.Int, ProductoID ?? null);
    request.input('Codigobarra', sql.VarChar(50), Codigobarra);
    request.input('Descripcion', sql.NVarChar(200), Descripcion);
    request.input('ProveedorID', sql.Int, ProveedorID);
    request.input('CategoriaID', sql.Int, CategoriaID);
    request.input('UnidadID', sql.Int, UnidadID);
    request.input('MarcaID', sql.Int, MarcaID);
    request.input('Servicio', sql.SmallInt, Servicio ?? null);
    request.input('Status', sql.SmallInt, Status ?? null);

    const result = await request.execute('spGuardarProducto');

    res.status(200).json({
      mensaje: ProductoID ? 'Producto actualizado' : 'Producto creado',
      resultado: result.recordset
    });
  } catch (error) {
    console.error('❌ Error en guardarProducto:', error);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
};