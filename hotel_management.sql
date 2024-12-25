-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2024 at 12:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_details`
--

CREATE TABLE `customer_details` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone_number` char(11) NOT NULL,
  `password` varchar(250) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_details`
--

INSERT INTO `customer_details` (`customer_id`, `customer_name`, `email`, `phone_number`, `password`, `is_active`, `created_date`) VALUES
(1, 'Suresh K R', 'sureshakr85@gmail.com', '9900223152', '*0CD5E5F2DE02BE98C175EB67EB906B926F001B9B', 1, '2024-12-24 14:59:01'),
(2, 'Ramesh', 'ramesh@gmail.com', '9901588608', '*2ADC12BF74CA34BE0D6F89E1E703185F809A47F9', 1, '2024-12-24 14:59:01');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` int(11) NOT NULL,
  `hotel_name` varchar(500) NOT NULL,
  `hotel_city` varchar(350) NOT NULL,
  `hotel_pincode` char(6) NOT NULL,
  `hotel_address` varchar(2000) NOT NULL,
  `rooms_availability` tinyint(3) NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `hotel_name`, `hotel_city`, `hotel_pincode`, `hotel_address`, `rooms_availability`, `created_date`, `modified_date`) VALUES
(1, 'FabHotel Galaxy Heights', 'Bangalore', '560045', 'No: 438, Viyalikaval Layout Near Indira Canteen, Nagvara Post, 560045 Bangalore', 10, '2024-12-24 12:36:48', '2024-12-24 17:08:40'),
(2, 'Holiday Inn Bengaluru Racecourse', 'Bangalore', '560009', '#16/1,Sheshadri Road Gandhinagar, Ward No.94, Bengaluru 560009', 5, '2024-12-24 12:36:48', '2024-12-24 17:08:40'),
(3, 'Radisson Blu Atria Bengaluru', 'Bangalore', '560001', 'No.1, Palace Road, 560001 Bangalore, India', 10, '2024-12-24 12:38:46', '2024-12-24 17:10:49'),
(4, 'ibis Bengaluru Hebbal', 'Bangalore', '560045', 'Opp Manyata Business Park Hebbal Outer Ring Road Nagawara, 560045 Bangalore', 20, '2024-12-24 12:38:46', '2024-12-24 17:10:49'),
(5, 'FabHotel Air Live', 'Hyderabad', '500016', 'H No 7-1-48/D, Dharam Karam Road, Ameerpet, Circle 16, 500016 Hyderabad', 10, '2024-12-24 12:40:55', '2024-12-24 17:12:13'),
(6, 'Hotel Silver Cl', 'Hyderabad', '500081', 'Madhapur Hitech City, 500081 Hyderabad, India', 5, '2024-12-24 12:42:18', '2024-12-24 17:13:50'),
(7, 'Hotel Deccan Serai Grande', 'Hyderabad', '500032', 'Plot no 42, 44 and Sy no 18, 19, Behind Vyshnavi Cynosure, Telecom Nagar ,Gachibowli, Hyderabad, 500032 Hyderabad, India', 15, '2024-12-24 12:42:18', '2024-12-24 17:13:50');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_booking_details`
--

CREATE TABLE `hotel_booking_details` (
  `hotel_booking_id` int(11) NOT NULL,
  `hotel_id` int(5) NOT NULL,
  `customer_id` int(5) NOT NULL,
  `checkin_time` datetime NOT NULL,
  `checkout_time` datetime NOT NULL,
  `num_of_rooms` int(5) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` int(5) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_by` int(5) NOT NULL,
  `modified_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotel_booking_details`
--

INSERT INTO `hotel_booking_details` (`hotel_booking_id`, `hotel_id`, `customer_id`, `checkin_time`, `checkout_time`, `num_of_rooms`, `is_deleted`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES
(1, 2, 1, '2024-12-26 11:30:00', '2024-12-28 16:00:00', 2, 0, 1, '2024-12-24 20:14:49', 1, '2024-12-24 20:14:49'),
(2, 5, 1, '2024-12-28 10:00:00', '2024-12-29 23:00:00', 1, 0, 1, '2024-12-24 20:16:10', 1, '2024-12-24 20:16:10'),
(3, 2, 1, '2024-12-26 11:30:00', '2024-12-28 16:00:00', 3, 0, 1, '2024-12-25 09:33:49', 1, '2024-12-25 09:33:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_details`
--
ALTER TABLE `customer_details`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Indexes for table `hotel_booking_details`
--
ALTER TABLE `hotel_booking_details`
  ADD PRIMARY KEY (`hotel_booking_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_details`
--
ALTER TABLE `customer_details`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `hotel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hotel_booking_details`
--
ALTER TABLE `hotel_booking_details`
  MODIFY `hotel_booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
