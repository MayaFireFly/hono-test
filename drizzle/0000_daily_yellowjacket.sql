CREATE TABLE `cats` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` float NOT NULL,
	CONSTRAINT `cats_id` PRIMARY KEY(`id`)
);
