# NodePoC1

Proyecto base en Node.js con Express y SQL Server para registrar productos.

## 🚀 Características

- API REST con Express
- Conexión a SQL Server
- Procedimiento almacenado para insertar/actualizar productos
- Thunder Client para pruebas

## 📦 Instalación

```bash
npm install




//////////////////////// DOCKER ///////////////////////////////

-- Abrir Docker Desktop  desde PowerShell 
Start-Process "Docker Desktop"

--Descargar la imagen oficial de docker de sql server
docker pull mcr.microsoft.com/mssql/server:2022-latest

--Crear y arrancar el contenero con nombre:sqlserver2022
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=TuPasswordSegura123!"  -p 1433:1433 --name sqlserver2022 -d mcr.microsoft.com/mssql/server:2022-latest

-- Si ya existe y solo se requiere iniciar el contenedor
docker start sqlserver2022

--Entrar al contenedor y ejecutar el comando sqlcmd
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P TuPasswordSegura123! -C

Validar docker
docker run hello-world

///////////////////////////////// Git //////////////////////////////////

  git config --global user.email "capitanpro@proton.me"
  git config --global user.name "Ernesto Cruz"
  
https://github.com/capitanpro/NodePoC1


//Descargar ramas remotas
git fetch --all

Descargar e integrar
//
git pull

//////////////////////////////////SQL Server ////////////////////////////
dbSmartPOS 
CREATE DATABASE dbSmartPOS;
GO


///////////////////////////////// Regla mnemotécnica: ///////////////

Nombrar:
 - **Archivos y clases** = **SINGULAR** (representan UN módulo/concepto)
 - **Rutas y tablas de BD** = **PLURAL** (representan colecciones)
 - **Funciones de controlador** = **Acción descriptiva** (pueden variar según el contexto)



/////////////////////// Extensiones ////////////////////////

--Material Icon Theme
--Postman
--Sql Server 
-- npm install bcrypt

////////////////////// NODE //////////////////////////////////

0-Importar la promesa de la conexión
    import { poolPromise, sql } from '../db.js';

1-Definir la función asíncrona que reciba req y res

    export const crearProducto = async (req, res) => {
        try {
        } catch (error) {
        
        }
    };

2-Capturar datos de la petición y destructuración de datos, es decir extraer las propiedades directamente del cuerpo d ela petición req.body.

  const {ProductoID,Codigobarra,Descripcion} = req.body;

Conexión con la base de datos, se espera que se resuelva la promesa y con "request" se crea una instancia de consulta vincualda al "pool" de conexiones

    const pool = await poolPromise; //promesa de conexión
    const request = pool.request(); //crea solicitud vacias para hacer peticiones a la BD


Mapeo de inputs (definición explicita para prevenir ataques de Inyección SQL)

    request.input('ProductoID', sql.Int, ProductoID ?? null);
    request.input('Codigobarra', sql.VarChar(50), Codigobarra);
    request.input('Descripcion', sql.NVarChar(200), Descripcion);

Ejecución del Stored Procedure: Se invoca el procedimiento almacenado spCrearProducto en SQL Server de forma asíncrona.

    const result = await request.execute('spCrearProducto');


Respuesta del servidor para el cliente en formato JSON
    res.status(200).json({
        mensaje: ProductoID ? 'Producto actualizado' : 'Producto creado',
        resultado: result.recordset
    });

Manejo de errores
    catch (error) {
        res.status(500).json({ error: 'Error al guardar el producto' });
    }


¿los nombre que se usan en const crearproducto, const pool, const request, const result, los definie el programador ? o existe una nomenclatura para asignar los nombre