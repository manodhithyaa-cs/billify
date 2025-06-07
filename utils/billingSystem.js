const db = require("./db.js");

// Login Details
function createLogin(data, callback) {
  const sql = `
    INSERT INTO login_details 
    (firstname, lastname, business_name, business_location, email, password) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [
    data.firstname,
    data.lastname,
    data.business_name,
    data.business_location,
    data.email,
    data.password
  ], callback);
}

function getAllLogins(callback) {
  db.query("SELECT * FROM login_details", callback);
}

// Vendors
function createVendor(data, callback) {
  const sql = `
    INSERT INTO vendors 
    (vendor_name, gst_number, phone_number, address) 
    VALUES (?, ?, ?, ?)`;
  db.query(sql, [
    data.vendor_name,
    data.gst_number,
    data.phone_number,
    data.address
  ], callback);
}

function getAllVendors(callback) {
  db.query("SELECT * FROM vendors", callback);
}

// Customers
function createCustomer(data, callback) {
  const sql = `
    INSERT INTO customers 
    (customer_name, location, salon_owner, phone, gst_number) 
    VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [
    data.customer_name,
    data.location,
    data.salon_owner,
    data.phone,
    data.gst_number
  ], callback);
}

function getAllCustomers(callback) {
  db.query("SELECT * FROM customers", callback);
}

// Purchases
function createPurchase(data, callback) {
  const sql = `
    INSERT INTO purchases 
    (purchase_date, vendor_id, purchase_amount, remarks) 
    VALUES (?, ?, ?, ?)`;
  db.query(sql, [
    data.purchase_date,
    data.vendor_id,
    data.purchase_amount,
    data.remarks
  ], callback);
}

function getAllPurchases(callback) {
  const sql = `
    SELECT p.*, v.vendor_name 
    FROM purchases p 
    JOIN vendors v ON p.vendor_id = v.vendor_id`;
  db.query(sql, callback);
}

// Purchase Items
function addPurchaseItem(data, callback) {
  const sql = `
    INSERT INTO purchase_items 
    (purchase_id, item_name) 
    VALUES (?, ?)`;
  db.query(sql, [data.purchase_id, data.item_name], callback);
}

function getItemsByPurchase(purchaseId, callback) {
  const sql = `
    SELECT * FROM purchase_items 
    WHERE purchase_id = ?`;
  db.query(sql, [purchaseId], callback);
}

module.exports = {
  createLogin,
  getAllLogins,
  createVendor,
  getAllVendors,
  createCustomer,
  getAllCustomers,
  createPurchase,
  getAllPurchases,
  addPurchaseItem,
  getItemsByPurchase,
};

/*
const billing = require("./models/billingSystem");

billing.getAllVendors((err, vendors) => {
  if (err) console.error(err);
  else console.log(vendors);
});
*/