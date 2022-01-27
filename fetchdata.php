<?php
   include("config.php");

    $sql = "SELECT * FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 8";  //This is where I specify what data to query
    $result = mysqli_query($db, $sql);

    $data = array();
    while($enr = mysqli_fetch_assoc($result)){
        $a = array($enr['temp'], $enr['hum'], $enr['sTemp'], $enr['sMois'], $enr['sec'], $enr['ph'], $enr['n'], $enr['p'], $enr['k'], $enr['r'], $enr['b'], $enr['si'], $enr['datetime']);
        array_push($data, $a);
    }

    echo json_encode($data);
?>
