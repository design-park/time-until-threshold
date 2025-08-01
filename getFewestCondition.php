<?php

/* Handle CORS */

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

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

// Set busy timeout to 10 seconds
$db->busyTimeout(10000);

// Query to count occurrences of "treatment"
$treatmentQuery = "SELECT COUNT(*) as count FROM log WHERE condition = 'treatment'";
$treatmentResult = $db->query($treatmentQuery);
$treatmentCount = $treatmentResult ? $treatmentResult->fetchArray(SQLITE3_ASSOC)['count'] : 0;

// Query to count occurrences of "control"
$controlQuery = "SELECT COUNT(*) as count FROM log WHERE condition = 'control'";
$controlResult = $db->query($controlQuery);
$controlCount = $controlResult ? $controlResult->fetchArray(SQLITE3_ASSOC)['count'] : 0;

// Determine the condition with the fewest occurrences
if ($treatmentCount <= $controlCount) {
    echo json_encode(['condition' => 'treatment', 'treatmentCount' => $treatmentCount, 'controlCount' => $controlCount]);
} else {
    echo json_encode(['condition' => 'control', 'treatmentCount' => $treatmentCount, 'controlCount' => $controlCount]);
}
$db->close();
