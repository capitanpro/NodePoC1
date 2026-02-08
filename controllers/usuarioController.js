import { request } from 'express';
import { poolPromise, sql } from '../db.js';

export const crearUsuario = async (req, res) => {
    try {
        const { UsuarioID, Nombre,
            Apellido,
            UserName,
            Correo,
            Password,
            TipoUsuarioID,
            FechaRegistro,
            FechaUltimoAcceso,
            Activo,
            RowDelete,
            Observaciones } = req.body;


            
        //Invocar la promesa de conexión
        const pool = await poolPromise;
        const request = pool.request();

        //mapeo de inputs
        request.input('UsuarioID', sql.Int, UsuarioID ?? null);
        request.input('Nombre', sql.NVarChar, Nombre);
        request.input('Apellido', sql.NVarChar, Apellido);

        request.input('UserName', sql.NVarChar, UserName);
        request.input('Password', sql.NVarChar, Password);
        request.input('TipoUsuarioId', sql.Int, TipoUsuarioID);

        request.input('FechaRegistro', sql.DateTime, FechaRegistro);
        request.input('FechaUltimoAcceso', sql.DateTime, FechaUltimoAcceso);

        request.input('IsActive', sql.Bit, Activo);
        request.input('IsDeleted', sql.Bit, RowDelete);

        //Ejecución de sp
        const result = await request.execute('sp_InsertUsuario');

        //Respuesta del servidor para el cliente en formato JSON
        res.status(200).json({
            mensaje: ProductoID ? 'Usuario actualizado' : 'Usuario creado',
            resultado: result.recordset
        });
    }
    catch (error) {

         console.error('❌ Error al guardar Usuario:', error);
        //Manejo de errores
        res.status(500).json({ error: 'Error al guardar el Usuario' });
    }

};