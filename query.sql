CREATE DATABASE [Test]
GO
	
USE [Test]
GO
/****** Object:  Table [dbo].[items]    Script Date: 7/21/2025 6:46:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[items](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[stock] [int] NOT NULL,
	[rating] [float] NULL,
	[name] [varchar](255) NULL,
	[description] [varchar](255) NULL,
	[price] [numeric](38, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 7/21/2025 6:46:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[item_id] [int] NULL,
	[timestamp] [datetime] NULL,
	[amount] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 7/21/2025 6:46:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](255) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[location] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phone_number] [varchar](255) NULL,
	[provider] [varchar](255) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [unique_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT (getdate()) FOR [timestamp]
GO
ALTER TABLE [dbo].[orders]  WITH NOCHECK ADD FOREIGN KEY([item_id])
REFERENCES [dbo].[items] ([id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_orders_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_orders_users]
GO
INSERT INTO [dbo].[items] ([stock], [rating], [name], [description], [price]) VALUES
(50, 4.5, 'Wireless Mouse', 'Ergonomic wireless mouse', 19.99),
(30, 4.2, 'Mechanical Keyboard', 'RGB mechanical keyboard', 49.99),
(100, 3.8, 'USB-C Cable', '1 meter charging cable', 5.99),
(75, 4.7, 'Bluetooth Speaker', 'Portable speaker with bass boost', 29.99),
(20, 4.9, 'Gaming Headset', 'Over-ear surround sound headset', 79.99),
(200, NULL, 'Notebook', 'Lined A5 notebook, 100 pages', 2.49),
(150, 4.3, 'Pen Pack', 'Set of 10 blue ink pens', 3.99),
(10, 5.0, 'Smart Watch', 'Waterproof smart watch with heart rate monitor', 149.99),
(80, 4.0, 'Backpack', 'Water-resistant laptop backpack', 39.99),
(60, 3.5, 'Desk Lamp', 'LED desk lamp with adjustable brightness', 24.99);
