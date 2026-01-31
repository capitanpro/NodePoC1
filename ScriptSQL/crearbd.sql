USE dbSmartPOS;
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
    )
    go