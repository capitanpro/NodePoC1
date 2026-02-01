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



--Descargar la imagen docker de sql server
docker pull mcr.microsoft.com/mssql/server:2022-latest

-- Abrir Docker Desktop  desde PowerShell 
Start-Process "Docker Desktop"

--Ejecutar la imangen y conectar a la bd
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P TuPasswordSegura123! -C


Validar docker
docker run hello-world