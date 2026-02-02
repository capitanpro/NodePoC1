SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spEliminarProductoLogico]
    @Id INT
AS
BEGIN
    -- SET NOCOUNT ON evita mensajes de "1 filas afectadas" que pueden interferir con el rendimiento
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificamos si el producto existe y si aún no ha sido borrado (Status = 1)
        IF EXISTS (SELECT 1 FROM dbo.Producto WHERE ProductoID = @Id AND Status = 1)
        BEGIN
            UPDATE dbo.producto
            SET Status = 0  -- 0 representa el borrado lógico (Inactivo)
            WHERE ProductoID = @Id;

            SELECT 'Producto ' + CAST(@Id AS VARCHAR) + ' soft-deleted successfully.' AS Result;
        END
        ELSE
        BEGIN
            SELECT 'Producto ' + CAST(@Id AS VARCHAR) + ' not found or already deleted.' AS Result;
        END
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO
