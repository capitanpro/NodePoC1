import { poolPromise, sql } from '../db.js';

export const crearProducto = async (req, res) => {
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

    const result = await request.execute('spCrearProducto');

    res.status(200).json({
      mensaje: ProductoID ? 'Producto actualizado' : 'Producto creado',
      resultado: result.recordset
    });
    
  } catch (error) {
    console.error('❌ Error en guardarProducto:', error);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
};

export const modificarProducto = async (req, res) => {
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

    if (!ProductoID) {
      return res.status(400).json({ error: 'ProductoID es requerido para modificar un producto' });
    }

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

    const result = await request.execute('spCrearProducto');

    res.status(200).json({
      mensaje: ProductoID ? 'Producto actualizado' : 'Producto creado',
      resultado: result.recordset[0]
    });
    
  } catch (error) {
    console.error('❌ Error en guardarProducto:', error);
    res.status(500).json({ error: 'Error al guardar el producto' });
  }
};



export const listarProductos = async (req, res) => {
    try {
        // 1. Obtener la conexión al pool
        const pool = await poolPromise;
        //const pool = await getConnection();

        // 2. Ejecutar el Procedimiento Almacenado
        // Si tu SP no requiere parámetros, se usa .execute('NombreSP')
        const result = await pool.request()
            .execute('spObtenerProducto'); 

        // 3. Responder con los datos (usualmente están en recordset)
        res.status(200).json({total: result.recordset.length, data:result.recordset});

    } catch (error) {
        // Manejo de errores profesional
        console.error("Error al listar productos:", error);
        res.status(500).json({
            message: "Error interno del servidor al obtener productos",
            error: error.message
        });
    }
};

export const listarProductosPaginados = async (req, res) => {

    // 1. Obtener parámetros de la query string con valores por defecto
    const page = parseInt(req.query.page) || 1;
    const rawSize = parseInt(req.query.size) || 10;

    const size = Math.min(rawSize, 100);
    try {
        // 2. Obtener la conexión al pool
        const pool = await poolPromise;
        //const pool = await getConnection();

        // 3. Ejecutar el Procedimiento Almacenado
        // 4. Pasar parámetros al SP
           
        const result = await pool.request()
            .input('Pagina', sql.Int, page)
            .input('SizePagina', sql.Int, size)
            .execute('spListarProductosPaginado');

        // 5. Extraer datos de los múltiples recordsets
        const productos = result.recordsets[0]; // Primer SELECT (los datos)
        const totalGlobal = result.recordsets[1][0].TotalRegistros; // Segundo SELECT (el conteo)


        // 6. Respuesta estructurada profesional
        res.status(200).json({
            ok: true,
            paginaActual: page,
            registrosPorPagina: size,
            totalRegistros: totalGlobal,
            totalPaginas: Math.ceil(totalGlobal / size),
            data: productos
        });
    } catch (error) {
        // Manejo de errores profesional
        console.error("Error al listar productos:", error);
        console.error("Error en paginación:", error);
        res.status(500).json({
            ok: false,
            message: "Error al obtener productos paginados",
            error: error.message
        });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    // 1. Obtener el ID desde los parámetros de la URL
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            // 2. Definir el parámetro de entrada (Nombre en SP, Tipo, Valor)
            .input('id', sql.Int, id)
            // 3. Ejecutar el SP que ahora recibe el ID
            .execute('spObtenerProducto'); 

        // 4. Validar si el producto existe
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Retornamos solo el primer objeto del array (el producto encontrado)
        res.json(result.recordset[0]);

    } catch (error) {
        res.status(500).json({ error: error.message, lst:"(Error en spObtenerProducto)" });
    }
};

export const eliminarProductoLogico = async(req, res) =>{
// 1. Obtener el ID desde los parámetros de la URL
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            // 2. Definir el parámetro de entrada (debe coincidir con el nombre en el SP)
            .input('id', sql.Int, id)
            // 3. Ejecutar el SP de borrado lógico
            .execute('spEliminarProductoLogico'); 

        // 4. El SP devuelve un recordset con el mensaje de éxito o fallo
        // Validamos si el SP retornó un mensaje de "no encontrado"
          // 4. Validar si el producto existe
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
            // Retornamos solo el primer objeto del array (el producto encontrado)
        res.json(result.recordset[0]);
      //  if (mensaje.includes("not found")) {
        //    return res.status(404).json({ 
          //      success: false, 
           //     message: mensaje 
           // });
        //}

        // Si todo salió bien
     //   res.json({
       //     success: true,
        //    message: mensaje
        //});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, lst:"(Error en spObtenerProducto)" });
    }

}