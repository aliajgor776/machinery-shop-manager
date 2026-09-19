CREATE TABLE `expenses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(120) NOT NULL,
	`note` text,
	`amount` decimal(12,2) NOT NULL,
	`expenseDate` timestamp NOT NULL DEFAULT (now()),
	`createdByName` varchar(160) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `expenses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sku` varchar(80) NOT NULL,
	`name` varchar(220) NOT NULL,
	`category` varchar(120),
	`unit` varchar(30) NOT NULL DEFAULT 'pcs',
	`stockQty` int NOT NULL DEFAULT 0,
	`lowStockThreshold` int NOT NULL DEFAULT 5,
	`costPrice` decimal(12,2) NOT NULL DEFAULT '0',
	`salePrice` decimal(12,2) NOT NULL DEFAULT '0',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_sku_unique` UNIQUE(`sku`)
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`productName` varchar(220) NOT NULL,
	`quantity` int NOT NULL,
	`unitCost` decimal(12,2) NOT NULL,
	`unitPrice` decimal(12,2) NOT NULL,
	`totalAmount` decimal(12,2) NOT NULL,
	`profitAmount` decimal(12,2) NOT NULL,
	`soldByStaffId` int,
	`soldByName` varchar(160) NOT NULL,
	`saleDate` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`phone` varchar(40),
	`email` varchar(320),
	`role` enum('manager','sales') NOT NULL DEFAULT 'sales',
	`passwordHash` varchar(255),
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
