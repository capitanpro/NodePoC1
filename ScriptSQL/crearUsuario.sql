SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_InsertUsuario]
    @UsuarioID         INT = 0, -- 0 para crear, > 0 para editar
    @Nombre            NVARCHAR(100),
    @Apellido          NVARCHAR(100),
    @UserName          NVARCHAR(50),
    @Correo            NVARCHAR(100),
    @Password          NVARCHAR(255),
    @TipoUsuarioID     INT,
    @Observaciones     NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Validar unicidad (ignorar al usuario actual si es un UPDATE)
        IF EXISTS (SELECT 1 FROM dbo.Usuario WHERE UserName = @UserName AND UsuarioID <> @UsuarioID)
        BEGIN
            RAISERROR('El nombre de usuario ya está en uso por otra cuenta.', 16, 1);
        END

        IF EXISTS (SELECT 1 FROM dbo.Usuario WHERE Correo = @Correo AND UsuarioID <> @UsuarioID)
        BEGIN
            RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        END

        -- 2. Operación de Inserción o Actualización
        IF @UsuarioID = 0
        BEGIN
            -- INSERTAR
            INSERT INTO dbo.Usuario (
                Nombre, Apellido, UserName, Correo, [Password], 
                TipoUsuarioID, FechaRegistro, IsActive, IsDeleted, Observaciones
            )
            VALUES (
                @Nombre, @Apellido, @UserName, @Correo, @Password, 
                @TipoUsuarioID, GETDATE(), 1, 0, @Observaciones
            );

            SET @UsuarioID = SCOPE_IDENTITY();
        END
        ELSE
        BEGIN
            -- ACTUALIZAR
            UPDATE dbo.Usuario
            SET Nombre = @Nombre,
                Apellido = @Apellido,
                UserName = @UserName,
                Correo = @Correo,
                [Password] = @Password, -- Nota: El hash ya debe venir del Backend
                TipoUsuarioID = @TipoUsuarioID,
                Observaciones = @Observaciones
            WHERE UsuarioID = @UsuarioID AND IsDeleted = 0;

            IF @@ROWCOUNT = 0 RAISERROR('Usuario no encontrado o eliminado.', 16, 1);
        END

        COMMIT TRANSACTION;

        -- 3. Retornar el objeto completo (Buena práctica para el Frontend)
        SELECT 
            UsuarioID, Nombre, Apellido, UserName, Correo, 
            TipoUsuarioID, FechaRegistro, IsActive, IsDeleted, Observaciones
        FROM dbo.Usuario 
        WHERE UsuarioID = @UsuarioID;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
GO