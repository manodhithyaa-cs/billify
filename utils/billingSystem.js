const db = require("./db.js");
const { hashPassword } = require('./encryption');

function createLogin(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(data.password);

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
        hashedPassword
      ], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    } catch (err) {
      reject(err);
    }
  });
}

function getAllLogins(callback) {
  db.query("SELECT * FROM login_details", callback);
}

module.exports = {
  createLogin,
  getAllLogins,
};
