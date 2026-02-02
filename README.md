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


////////////////////// NODE //////////////////////////////////
Definir la función asíncrona que reciba req y res

    export const crearProducto = async (req, res) => {
        try {
        } catch (error) {
        
        }
    };

Capturar datos de la petición y extraer los parámetros necesarios desde req.body.


