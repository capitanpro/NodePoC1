// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../db'); // tu módulo de conexión a SQL Server

// Variables de entorno recomendadas:
// process.env.JWT_SECRET
// process.env.JWT_EXPIRES_IN

exports.login = async (req, res) => {
  const { UsuarioNombre, Password } = req.body;

  try {
    // Validar entrada
    if (!UsuarioNombre || !Password) {
      return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    // Buscar usuario en la base de datos
    const result = await pool.request()
      .input('UsuarioNombre', UsuarioNombre)
      .query('SELECT * FROM Usuario WHERE UsuarioNombre = @UsuarioNombre AND Activo = 1 AND RowDelete = 0');

    const usuario = result.recordset[0];
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Validar contraseña
    const passwordMatch = await bcrypt.compare(Password, usuario.Password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: usuario.UsuarioID,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        tipoUsuario: usuario.TipoUsuarioID,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};