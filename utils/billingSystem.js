const db = require("./db.js");

// Login Details
function createLogin(data, callback) {
  const sql = "INSERT INTO login_details SET ?";
  db.query(sql, data, callback);
}

function getAllLogins(callback) {
  db.query("SELECT * FROM login_details", callback);
}

// Vendors
function createVendor(data, callback) {
  const sql = "INSERT INTO vendors SET ?";
  db.query(sql, data, callback);
}

function getAllVendors(callback) {
  db.query("SELECT * FROM vendors", callback);
}

// Customers
function createCustomer(data, callback) {
  const sql = "INSERT INTO customers SET ?";
  db.query(sql, data, callback);
}

function getAllCustomers(callback) {
  db.query("SELECT * FROM customers", callback);
}

// Purchases
function createPurchase(data, callback) {
  const sql = "INSERT INTO purchases SET ?";
  db.query(sql, data, callback);
}

function getAllPurchases(callback) {
  db.query("SELECT * FROM purchases", callback);
}

// Purchase Items (Order)
function addPurchaseItem(data, callback) {
  const sql = "INSERT INTO purchase_items SET ?";
  db.query(sql, data, callback);
}

function getItemsByPurchase(purchaseId, callback) {
  const sql = "SELECT * FROM purchase_items WHERE purchase_id = ?";
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
