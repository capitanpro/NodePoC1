CREATE PROCEDURE sp_ObtenerProducto
    @Id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        -- Si no se pasa parámetro, devuelve todos los registros
        SELECT *
        FROM Producto;
    END
    ELSE
    BEGIN
        -- Si se pasa un Id, devuelve solo ese registro
        SELECT *
        FROM Producto p
        WHERE p.ProductoID = @Id;
    END
END;
GO