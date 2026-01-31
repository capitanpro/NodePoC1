-- Crear SP para registra o modificar un registro
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
      Status = @Status,
      Servicio = @Servicio
     
    WHERE ProductoID = @ProductoID;

    SELECT @ProductoID AS ProductoActualizado;
  END
END;


