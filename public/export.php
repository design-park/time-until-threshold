<?php

/* Handle CORS */

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: GET, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');

// Exit early so the page isn't fully loaded for options requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}

// Open a sqlite database
$db = new SQLite3('log.db');
if (!$db) {
  die('Could not open database.');
}

// Query all data from the log table
$result = $db->query('SELECT * FROM log');
if (!$result) {
  die('Could not retrieve data from database.');
}

// Set headers for CSV file download
header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="log_data.csv"');

// Open output stream
$output = fopen('php://output', 'w');

// Write column headers
$columns = [
  'id', 'userID', 'condition', 'gender', 'age', 'education', 'partyAffiliation', 'income', 'religion',
  'valence', 'arousal', 'tempDistance1', 'tempDistance2',
  'societal1', 'societal2', 'societal3', 'societal4', 'societal5', 'societal6', 'societal7',
  'personal1', 'personal2', 'personal3', 'personal4', 'personal5', 'personal6',
  'advocacy1', 'advocacy2', 'advocacy3', 'advocacy4',
  'postValence', 'postArousal', 'postTempDistance1', 'postTempDistance2',
  'postSocietal1', 'postSocietal2', 'postSocietal3', 'postSocietal4', 'postSocietal5', 'postSocietal6', 'postSocietal7',
  'postPersonal1', 'postPersonal2', 'postPersonal3', 'postPersonal4', 'postPersonal5', 'postPersonal6',
  'postAdvocacy1', 'postAdvocacy2', 'postAdvocacy3', 'postAdvocacy4', 'eventDatetime'
];
fputcsv($output, $columns);

// Write rows to CSV
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
  fputcsv($output, $row);
}

// Close output stream
fclose($output);

// Close database connection
$db->close();

?>
