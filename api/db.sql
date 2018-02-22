

-- A user may maintain one or more locations 
CREATE TABLE `users` (
  `id   INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `active` bit NOT NULL,
  `resetToken` varchar(50) DEFAULT NULL,
  `resetComplete` varchar(50) DEFAULT 'No',
  `action_type` enum('turn_on','turn_off','change_device') DEFAULT NULL,
  `action_taken_description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
	
-- A list of physical sensor locations, usually mounted inside or outside the storage.
-- For example, tank pressure sensor could be installed on top of the tank or inside the tank.
-- a location can contain one or more sensors.
CREATE TABLE `locations` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(50), -- engine, exhaust, indoor, outdoor, etc.
PRIMARY KEY (`id`),
FOREIGN KEY (`user_id`) REFERENCES users(id)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

--
-- A list of sensors, measuring a single value. 
-- Could be temperature, humidity, light, water level, electricity usage etc. 
-- These are linked back to the location table so multiple sensors are present in a location. 
CREATE TABLE `sensors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_bin NOT NULL, -- text description of the sensor like Sensor TH-B14 in crankshaft, Oil Temp.
  `sensor_type` enum('temperature','humidity','pressure','co2','light','windspeed','velocity','heartrate','bloodpressure') COLLATE utf8mb4_bin DEFAULT NULL,
  `status` bit(1) DEFAULT NULL, -- health status of the sensor
  `upper_limit_value` varchar(45),
  `lower_limit_value` varchar (45),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`location_id`) REFERENCES locations(id)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

--
-- readings are captured from each sensor at individual time stamped.
-- sensor readings are tranmitted over a wireless channel to a running application
-- that makes decisions.
CREATE TABLE `readings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor_id` int(11) NOT NULL,
  `date_time` timestamp NOT NULL,  -- format yyyy − mm − dd hh : MM : ss
  `value` float NOT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sensor_id`) REFERENCES sensors(id)
 ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

 
CREATE alerts (
id int,
sensor_id int,
reading_id int,
date_time timestamp NOT NULL,
description VARCHAR(45),
cleared BIT,
type VARCHAR(45)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin

-- Criterias:

-- Table are "fill only". There are no delete and update operations.
-- INSERT (date_time, value) should be fast.
-- SELECT (date_time, value) for an specific time range should be fast.
 
