ALTER PROCEDURE spObtenerProductosPaginado
    @Pagina INT,
    @SizePagina INT
AS
BEGIN
    SELECT * FROM Producto p WHERE p.status=1
    ORDER BY p.ProductoID 
    OFFSET (@Pagina - 1) * @SizePagina ROWS  
    FETCH NEXT @SizePagina ROWS ONLY;

    -- También necesitamos el total real de la tabla para el Frontend
    SELECT COUNT(*) AS TotalRegistros FROM Producto p WHERE p.status=1;
END