<?php
class Reading{
 
    // database connection and table name
    private $conn;
    private $table_name = "readings";
 
    // object properties
    public $id;
    public $date_time;
    public $sensor_id;
    public $value;
    public $status;
     
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read from the readings table
	public function read(){
		// select query
		$query = "SELECT
				id, date_time, sensor_id, value, status
				FROM
					" . $this->table_name . " 
				ORDER BY
					date_time DESC";
	 
		// prepare query statement
		$stmt = $this->conn->query($query);
	 
		// execute query
		$stmt->execute();
 
    return $stmt;
}
}
