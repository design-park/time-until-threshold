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

// Create a table
$db->exec('CREATE TABLE IF NOT EXISTS log (
  id INTEGER PRIMARY KEY,
  userID TEXT NOT NULL,
  condition TEXT,
  gender TEXT,
  age TEXT,
  education TEXT,
  partyAffiliation TEXT,
  income TEXT,
  religion TEXT,
  valence REAL,
  arousal REAL,
  tempDistance1 INTEGER,
  tempDistance2 INTEGER,
  societal1 INTEGER,
  societal2 INTEGER,
  societal3 INTEGER,
  societal4 INTEGER,
  societal5 INTEGER,
  societal6 INTEGER,
  societal7 INTEGER,
  personal1 INTEGER,
  personal2 INTEGER,
  personal3 INTEGER,
  personal4 INTEGER,
  personal5 INTEGER,
  personal6 INTEGER,
  advocacy1 INTEGER,
  advocacy2 INTEGER,
  advocacy3 INTEGER,
  advocacy4 INTEGER,
  postValence REAL,
  postArousal REAL,
  postTempDistance1 INTEGER,
  postTempDistance2 INTEGER,
  postSocietal1 INTEGER,
  postSocietal2 INTEGER,
  postSocietal3 INTEGER,
  postSocietal4 INTEGER,
  postSocietal5 INTEGER,
  postSocietal6 INTEGER,
  postSocietal7 INTEGER,
  postPersonal1 INTEGER,
  postPersonal2 INTEGER,
  postPersonal3 INTEGER,
  postPersonal4 INTEGER,
  postPersonal5 INTEGER,
  postPersonal6 INTEGER,
  postAdvocacy1 INTEGER,
  postAdvocacy2 INTEGER,
  postAdvocacy3 INTEGER,
  postAdvocacy4 INTEGER,
  eventDatetime TEXT NOT NULL
)');
echo("Test 1");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Insert a row using POST data
  $stmt = $db->prepare('INSERT INTO log (
    userID, condition, gender, age, education, partyAffiliation, income, religion,
    valence, arousal, tempDistance1, tempDistance2,
    societal1, societal2, societal3, societal4, societal5, societal6, societal7,
    personal1, personal2, personal3, personal4, personal5, personal6,
    advocacy1, advocacy2, advocacy3, advocacy4,
    postValence, postArousal, postTempDistance1, postTempDistance2,
    postSocietal1, postSocietal2, postSocietal3, postSocietal4, postSocietal5, postSocietal6, postSocietal7,
    postPersonal1, postPersonal2, postPersonal3, postPersonal4, postPersonal5, postPersonal6,
    postAdvocacy1, postAdvocacy2, postAdvocacy3, postAdvocacy4, eventDatetime
  ) VALUES (
    :userID, :condition, :gender, :age, :education, :partyAffiliation, :income, :religion,
    :valence, :arousal, :tempDistance1, :tempDistance2,
    :societal1, :societal2, :societal3, :societal4, :societal5, :societal6, :societal7,
    :personal1, :personal2, :personal3, :personal4, :personal5, :personal6,
    :advocacy1, :advocacy2, :advocacy3, :advocacy4,
    :postValence, :postArousal, :postTempDistance1, :postTempDistance2,
    :postSocietal1, :postSocietal2, :postSocietal3, :postSocietal4, :postSocietal5, :postSocietal6, :postSocietal7,
    :postPersonal1, :postPersonal2, :postPersonal3, :postPersonal4, :postPersonal5, :postPersonal6,
    :postAdvocacy1, :postAdvocacy2, :postAdvocacy3, :postAdvocacy4, :eventDatetime
  )');
  echo("Test 2");

  $inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE); //convert JSON into array

  echo(json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

  // Bind values from POST data
  $stmt->bindValue(':userID', $input['userID']);
  $stmt->bindValue(':condition', $input['condition']);
  $stmt->bindValue(':gender', $input['gender']);
  $stmt->bindValue(':age', $input['age']);
  $stmt->bindValue(':education', $input['education']);
  $stmt->bindValue(':partyAffiliation', $input['partyAffiliation']);
  $stmt->bindValue(':income', $input['income']);
  $stmt->bindValue(':religion', $input['religion']);
  $stmt->bindValue(':valence', $input['valence']);
  $stmt->bindValue(':arousal', $input['arousal']);
  $stmt->bindValue(':tempDistance1', $input['tempDistance1']);
  $stmt->bindValue(':tempDistance2', $input['tempDistance2']);
  $stmt->bindValue(':societal1', $input['societal1']);
  $stmt->bindValue(':societal2', $input['societal2']);
  $stmt->bindValue(':societal3', $input['societal3']);
  $stmt->bindValue(':societal4', $input['societal4']);
  $stmt->bindValue(':societal5', $input['societal5']);
  $stmt->bindValue(':societal6', $input['societal6']);
  $stmt->bindValue(':societal7', $input['societal7']);
  $stmt->bindValue(':personal1', $input['personal1']);
  $stmt->bindValue(':personal2', $input['personal2']);
  $stmt->bindValue(':personal3', $input['personal3']);
  $stmt->bindValue(':personal4', $input['personal4']);
  $stmt->bindValue(':personal5', $input['personal5']);
  $stmt->bindValue(':personal6', $input['personal6']);
  $stmt->bindValue(':advocacy1', $input['advocacy1']);
  $stmt->bindValue(':advocacy2', $input['advocacy2']);
  $stmt->bindValue(':advocacy3', $input['advocacy3']);
  $stmt->bindValue(':advocacy4', $input['advocacy4']);
  $stmt->bindValue(':postValence', $input['postValence']);
  $stmt->bindValue(':postArousal', $input['postArousal']);
  $stmt->bindValue(':postTempDistance1', $input['postTempDistance1']);
  $stmt->bindValue(':postTempDistance2', $input['postTempDistance2']);
  $stmt->bindValue(':postSocietal1', $input['postSocietal1']);
  $stmt->bindValue(':postSocietal2', $input['postSocietal2']);
  $stmt->bindValue(':postSocietal3', $input['postSocietal3']);
  $stmt->bindValue(':postSocietal4', $input['postSocietal4']);
  $stmt->bindValue(':postSocietal5', $input['postSocietal5']);
  $stmt->bindValue(':postSocietal6', $input['postSocietal6']);
  $stmt->bindValue(':postSocietal7', $input['postSocietal7']);
  $stmt->bindValue(':postPersonal1', $input['postPersonal1']);
  $stmt->bindValue(':postPersonal2', $input['postPersonal2']);
  $stmt->bindValue(':postPersonal3', $input['postPersonal3']);
  $stmt->bindValue(':postPersonal4', $input['postPersonal4']);
  $stmt->bindValue(':postPersonal5', $input['postPersonal5']);
  $stmt->bindValue(':postPersonal6', $input['postPersonal6']);
  $stmt->bindValue(':postAdvocacy1', $input['postAdvocacy1']);
  $stmt->bindValue(':postAdvocacy2', $input['postAdvocacy2']);
  $stmt->bindValue(':postAdvocacy3', $input['postAdvocacy3']);
  $stmt->bindValue(':postAdvocacy4', $input['postAdvocacy4']);
  $stmt->bindValue(':eventDatetime', date('Y-m-d H:i:s'));
  echo("Test 3");

  $stmt->execute();
  echo("Test 4");
  echo($db->changes());
}
$db->close();
echo("Test 5");
