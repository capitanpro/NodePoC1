
--CREATE DATABASE [dbSmartPOS]

--SELECT name FROM sys.databases; 

--Crear Tabla Productos
/*USE dbSmartPOS
    CREATE TABLE [dbo].[Producto]
    (
    [ProductoID] [int] NOT NULL IDENTITY(1, 1),
    [Codigobarra] [varchar] (50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [Descripcion] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
    [ProveedorID] [int] NOT NULL,
    [CategoriaID] [int] NOT NULL,
    [UnidadID] [int] NOT NULL,
    [MarcaID] [int] NOT NULL,
    [Servicio] [smallint] NULL CONSTRAINT [DF__Producto__Servic__2DB1C7EE] DEFAULT ((0)),
    [Status] [smallint] NULL CONSTRAINT [DF__Producto__status__5DEAEAF5] DEFAULT ((1))
    )*/

-- Crear SP para registra o modificar un registro
/*
CREATE PROCEDURE spGuardarProducto
  @ProductoID     INT = NULL,
  @Codigobarra    VARCHAR(50),
  @Descripcion    NVARCHAR(200),
  @ProveedorID    INT,
  @CategoriaID    INT,
  @UnidadID       INT,
  @MarcaID        INT,
  @Servicio       SMALLINT = NULL,
  @Status         SMALLINT = NULL
AS
BEGIN
  SET NOCOUNT ON;

  IF @ProductoID IS NULL
  BEGIN
    -- Insertar nuevo producto
    INSERT INTO dbo.Producto (
      Codigobarra,
      Descripcion,
      ProveedorID,
      CategoriaID,
      UnidadID,
      MarcaID,
      Servicio,
      Status
    )
    VALUES (
      @Codigobarra,
      @Descripcion,
      @ProveedorID,
      @CategoriaID,
      @UnidadID,
      @MarcaID,
      @Servicio,
      @Status
    );

    -- Retornar el ID insertado
    SELECT SCOPE_IDENTITY() AS NuevoProductoID;
  END
  ELSE
  BEGIN
    -- Actualizar producto existente
    UPDATE dbo.Producto
    SET
      Codigobarra = @Codigobarra,
      Descripcion = @Descripcion,
      ProveedorID = @ProveedorID,
      CategoriaID = @CategoriaID,
      UnidadID = @UnidadID,
      MarcaID = @MarcaID,
      Servicio = @Servicio,
      Status = @Status
    WHERE ProductoID = @ProductoID;

    SELECT @ProductoID AS ProductoActualizado;
  END
END;/*


