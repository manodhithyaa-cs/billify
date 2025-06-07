.-- Billing System Database Schema

create Database BillingSystem;

use BillingSystem;

-- 1. Login Details
CREATE TABLE login_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    business_name VARCHAR(100),
    business_location VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 2. Vendor Details
CREATE TABLE vendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_name VARCHAR(100),
    gst_number VARCHAR(15),
    phone_number VARCHAR(15),
    address TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Customers
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    location VARCHAR(100),
    salon_owner VARCHAR(100),
    phone VARCHAR(15),
    gst_number VARCHAR(15),
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Purchases
CREATE TABLE purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_date DATE,
    vendor_id INT,
    purchase_amount DECIMAL(10,2),
    remarks TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);

-- 5. Purchase Items (Order Table)
CREATE TABLE purchase_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT,
    item_name VARCHAR(100),
    FOREIGN KEY (purchase_id) REFERENCES purchases(purchase_id)
);
