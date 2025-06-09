-- Billing System Database Schema

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
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT "Owner",
    status int NOT NULL DEFAULT 0
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

-- 6. Login verification
CREATE TABLE verification_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL
);


INSERT INTO vendors (vendor_name, gst_number, phone_number, address)
VALUES 
('Beauty Supplies Inc.', '29AAACB1234C1Z', '9876543210', '123 MG Road, Mumbai'),
('Salon Essentials', '19AACCE2345D2Y', '9123456789', '22 Park Street, Delhi');

INSERT INTO customers (customer_name, location, salon_owner, phone, gst_number)
VALUES 
('Priya Kumar', 'Chennai', 'Alice Johnson', '9876000001', '33AAGCP1234F1Z'),
('Rahul Mehta', 'Bangalore', 'Bob Smith', '9876000002', '29BBBCM4567H2X');

-- INSERT INTO login_details (firstname, lastname, business_name, business_location, email, password)
-- VALUES 
-- ('Alice', 'Johnson', 'Glow Salon', 'Chennai', 'alice@example.com', 'hashed_password1'),
-- ('Bob', 'Smith', 'Style Hub', 'Bangalore', 'bob@example.com', 'hashed_password2');

INSERT INTO purchases (purchase_date, vendor_id, purchase_amount, remarks)
VALUES 
('2025-06-01', 1, 5000.00, 'Monthly restock'),
('2025-06-05', 2, 7500.50, 'Bulk discount order');

INSERT INTO purchase_items (purchase_id, item_name)
VALUES 
(1, 'Shampoo Bottles'),
(1, 'Hair Serums'),
(2, 'Face Creams'),
(2, 'Hair Dryers');
