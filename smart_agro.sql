-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2021 at 05:19 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_agro`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_values`
--

CREATE TABLE `data_values` (
  `dataID` varchar(50) NOT NULL,
  `locID` varchar(50) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `mois` int(11) NOT NULL,
  `temp` int(11) NOT NULL,
  `hum` int(11) NOT NULL,
  `lux` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_values`
--

INSERT INTO `data_values` (`dataID`, `locID`, `userID`, `datetime`, `mois`, `temp`, `hum`, `lux`) VALUES
('001', 'undefined', 'undefined', '2021-09-21 11:56:19', 66, 46, 73, 356),
('001', 'undefined', 'undefined', '2021-09-21 11:59:28', 66, 46, 73, 356),
('001', 'undefined', 'undefined', '2021-09-21 12:08:16', 66, 46, 73, 356),
('001', 'undefined', 'undefined', '2021-09-21 14:48:00', 66, 46, 73, 356);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `locID` varchar(10) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(50) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `userID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`locID`, `address`, `city`, `longitude`, `latitude`, `userID`) VALUES
('lc_001', 'No 01, Hapugala Galle', 'Galle', '6.046672366307944', ' 80.19448682992747', 'user001'),
('lc_002', 'Riverston, Matale', 'Matale', '7.540151316633443', '80.74997900392103', 'user001'),
('lc_003', 'Pothanegama', 'Pothanegama', '7.989156875109475', '80.41251167765263', 'user001');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(10) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullName`, `username`, `password`, `email`) VALUES
('user001', 'Nethsara Liyanage', 'nxtha123', '12345', 'nethsara@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
