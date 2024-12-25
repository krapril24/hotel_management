const db = require('../config/db');

module.exports = {
    getAllUsers: (callback) => {
      const query = 'SELECT * FROM  customer_details';
      db.query(query, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results); // Return the result
      });
    },
    createUser: (userData, callback) => {
        const { name, email, password } = userData;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        pool.query(query, [name, email, password], (err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results);
        });
      },
      validateCredential:(userData, callback) =>{
        const { email, password } = userData;
        const query = "select customer_name, email from customer_details where email = ? and password = PASSWORD(?) limit 1";
        db.query(query,[email,password], (err,results)=>{
            if(err){
                return callback(err,null);
            }
            callback(null,results);
        });
      }
}