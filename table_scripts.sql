-- Adatbázis létrehozása
CREATE DATABASE sales_db;

-- Adatbázis kiválasztása
USE sales_db;

-- Értékesítések tábla létrehozása
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Dolgozók tábla létrehozása
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employee_number VARCHAR(255) NOT NULL
);

-- Termékek tábla létrehozása
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
price DECIMAL(10,2) NOT NULL
);

-- Alapadatok hozzáadása a dolgozók táblához
INSERT INTO employees (name, employee_number) VALUES
('John Smith', '12345'),
('Jane Doe', '67890');

-- Alapadatok hozzáadása a termékek táblához
INSERT INTO products (name, price) VALUES
('Soup', '3.99'),
('Sandwich', '5.99'),
('Coffee', '2.50');