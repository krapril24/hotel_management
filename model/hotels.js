const db = require('../config/db');

module.exports = {
    getHotelsByCity:(cityName,callback) => {
      const city = `%${cityName}%`;
      const query = "SELECT hotel_name, hotel_city, hotel_address, rooms_availability FROM  hotels where hotel_city LIKE ? ";
      db.query(query,[city],(err, results) => {
        if (err) { 
          return callback(err, null);
        }
        callback(null, results); 
      });
    },
    hotelBooking:(roomData,callback) =>{
        try{
            const {hotelName,numOfRooms,checkInTime,checkOutTime} = roomData;
            const htlName = `${hotelName}`;
            
            const sqlquery = "select hotel_id from hotels where hotel_name like ? ";
            db.query(sqlquery,[htlName],(err,result)=>{
                if (err) { 
                    return callback(err, null);
                }
                if (result.length === 0) {
                    return callback(null, null);  // Return null if no hotel is found
                }
                const hotelID = result[0].hotel_id;
                if(hotelID){
                    const query = 'INSERT INTO hotel_booking_details (hotel_id, customer_id, checkin_time, checkout_time, num_of_rooms, created_by, created_date, modified_by, modified_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW())';
                    db.query(query, [hotelID, 1, checkInTime, checkOutTime, numOfRooms, 1, 1], (err, results) => {
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, results);
                    });
                }else{
                    const error = new Error('Hotel ID is required');
                    return callback(error, null);  
                }
        });
        }catch(err){
            callback(err,null);
        }
    },
    getBookedRooms: async (custID) =>{
      try{
        const query = "SELECT hotel_booking_details.*, hotels.hotel_name, hotels.hotel_city, hotels.hotel_pincode, hotels.hotel_address FROM `hotel_booking_details` LEFT JOIN hotels ON hotel_booking_details.hotel_id = hotels.hotel_id LEFT JOIN customer_details ON customer_details.customer_id = hotel_booking_details.customer_id WHERE hotel_booking_details.customer_id = ? AND hotel_booking_details.is_deleted = 0 GROUP BY hotel_booking_details.hotel_id";
        const results = await new Promise((resolve, reject) => {
          db.query(query, [custID], (err, results) => {
            if (err) {
              reject(new Error(`Database query failed: ${err.message}`));
            } else {
              resolve(results);
            }
          });
        });
        return results;
      }catch(error){
        throw new Error(`Error fetching booked rooms: ${error.message}`);
      }
    },
    updateBooking: async (bookingData) =>{
        const {booking_id,numOfRooms,checkInTime,checkOutTime} = bookingData;
        try {
          const query = "Update hotel_booking_details set checkin_time = ?, checkout_time = ?, num_of_rooms = ? where hotel_booking_id = ?";
          const results = await db.query(query, [checkInTime, checkOutTime, numOfRooms, booking_id]);
      
          if (results.affectedRows === 0) {
            throw new Error('No booking found with the provided booking_id');
          }
          return results; 
        } catch (error) {
          throw new Error(`Error updating booking: ${error.message}`);
        }
    },
    cancelBooking:(bookingID,callback) =>{
        const {booking_id} = bookingID;
        const query = "Update hotel_booking_details set is_deleted = 1 where hotel_booking_id = ?";
        db.query(query,[booking_id],(err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results); 
        }); 
    }
};