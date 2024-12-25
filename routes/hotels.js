const express = require('express');
const router = express.Router();
const xss = require('xss');
const hotelmodel = require('../model/hotels');

//get hotel list based on location using callback method
router.post('/getHotelsByCity',(req,res)=>{
    const cityName = xss(req.body.city);
    if (cityName === null || cityName === undefined || cityName.trim() === '') {
        return res.status(400).send({error:'City name is required',message:""});
    }
    hotelmodel.getHotelsByCity(cityName,(err,hotels) =>{
        if (err) {
            return res.status(500).send({ error: 'Database query failed', message: err.message });
        }
        res.json(hotels);
    });
});

// Room booking using callback method
router.post('/roombooking',(req,res)=>{
    const hotelName = xss(req.body.hotelName);
    const numOfRooms = xss(req.body.roomsCount);
    const checkInTime = xss(req.body.checkInTime);
    const checkOutTime = xss(req.body.checkOutTime);

    if (hotelName === null || hotelName === undefined || hotelName.trim() === '') {
        return res.status(400).send({error:'Hotel name is required',message:""});
    }
    if (numOfRooms === null || numOfRooms === undefined || numOfRooms.trim() === '') {
        return res.status(400).send({error:'Number of Rooms is required',message:""});
    }
    if (checkInTime === null || checkInTime === undefined || checkInTime.trim() === '') {
        return res.status(400).send({error:'Check In Time is required',message:""});
    }
    if (checkOutTime === null || checkOutTime === undefined || checkOutTime.trim() === '') {
        return res.status(400).send({error:'Check Out Time is required',message:""});
    }

    if(isNaN(numOfRooms)){
        return res.status(400).send({error:'Number of Rooms should be integer',message:""});
    }

    hotelmodel.hotelBooking({hotelName,numOfRooms,checkInTime,checkOutTime},(err,data)=>{
        if (err) {
            return res.status(500).send({ error: 'Database query failed', message: err.message });
        }
        res.json(data);
    });

});
// Get list of booked rooms based on customer ID using async/await
router.post('/getBookedRooms', async (req,res)=>{
    const custID = xss(req.body.customerID);
    if (custID === null || custID === undefined || custID.trim() === '') {
        return res.status(400).send({error:'Customer ID is required',message:""});
    }
    if(isNaN(custID)){
        return res.status(400).send({error:'Customer ID should be integer',message:""});
    }
    
    try {
        const hotels = await hotelmodel.getBookedRooms(custID); 
        res.json(hotels); 
      } catch (err) {
        res.status(500).send({ error: 'Database query failed', message: err.message });
      }
});

//Update booking details 
router.post('/updateBooking', async (req,res)=>{
    const booking_id = xss(req.body.booking_id);
    const numOfRooms = xss(req.body.roomsCount);
    const checkInTime = xss(req.body.checkInTime);
    const checkOutTime = xss(req.body.checkOutTime);
    
    if (booking_id === null || booking_id === undefined || booking_id.trim() === '') {
        return res.status(400).send({error:'Booking ID is required',message:""});
    }
    if (numOfRooms === null || numOfRooms === undefined || numOfRooms.trim() === '') {
        return res.status(400).send({error:'Number of Rooms is required',message:""});
    }
    if (checkInTime === null || checkInTime === undefined || checkInTime.trim() === '') {
        return res.status(400).send({error:'Check in time is required',message:""});
    }
    if (checkOutTime === null || checkOutTime === undefined || checkOutTime.trim() === '') {
        return res.status(400).send({error:'Check out time is required',message:""});
    }

    try {
        const result = await hotelmodel.updateBooking({booking_id,numOfRooms,checkInTime,checkOutTime});
        res.status(200).json({ message: 'Booking updated successfully', result });
      } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
//cancel the booking rooms
router.post('/cancelBooking', (req,res)=>{
    const booking_id = xss(req.body.booking_id);
    if (booking_id === null || booking_id === undefined || booking_id.trim() === '') {
        return res.status(400).send({error:'Booking id is required',message:""});
    }
    hotelmodel.cancelBooking({booking_id},(err,data)=>{
        if (err) {
            return res.status(500).send({ error: 'Database query failed', message: err.message });
        }
        res.json(data);
    });
    
});

module.exports = router;