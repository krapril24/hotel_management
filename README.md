Steps to use the code
1. Clone the git repository to local machine
2. import hotel_management.sql to mysql db
3. change the db credentials in the .env file
4. import the postman collection(hotel_management_api.postman_collection.json) in the postman
5. API sequence are listed below
   5.1 http://localhost:3000/login/login
   5.2 http://localhost:3000/hotels/getHotelsByCity
   5.3 http://localhost:3000/hotels/roombooking
   5.4 http://localhost:3000/hotels/getBookedRooms
   5.5 http://localhost:3000/hotels/updateBooking
   5.6 http://localhost:3000/hotels/cancelBooking


Note:Since login module is optional sessions and token validations are not implemented.
   
