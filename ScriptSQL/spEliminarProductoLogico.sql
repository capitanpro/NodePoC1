SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spObtenerProducto]
    @Id INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Id IS NULL
    BEGIN
        -- Si no se pasa parámetro, devuelve todos los registros
        SELECT *
        FROM Producto p WHERE p.status=1;
    END
    ELSE
    BEGIN
        -- Si se pasa un Id, devuelve solo ese registro
        SELECT *
        FROM Producto p
        WHERE p.ProductoID = @Id and p.status=1;
    END
END;
GO
