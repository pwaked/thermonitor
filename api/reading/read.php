<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reading.php';
 
// instantiate database and reading object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$reading = new Reading($db);
 
// query readings
$stmt = $reading->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // readings array
    $readings_arr=array();
    $readings_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $reading_item=array(
            "id" => $id,
            "date_time" => $date_time,
            "sensor_id" => $sensor_id,
            "value" => $value,
            "status" => $status
        );
 
        array_push($readings_arr["records"], $reading_item);
    }
 
    echo json_encode($readings_arr);
}
 
else{
    echo json_encode(
        array("message" => "No readings found.")
    );
}
?>
