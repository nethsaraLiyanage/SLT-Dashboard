<?php
   include("config.php");

//    $users = "SELECT * FROM user";
//    $result1 = mysqli_query($db, $users);

    // while($enr = mysqli_fetch_assoc($result1)){

    //     $farms = "SELECT * FROM location";
    //     $result2 = mysqli_query($db, $farms);

    //     while($enr = mysqli_fetch_assoc($result2)){

    //         $sql = "SELECT * FROM data_values WHERE farmID = 'loc_001' ORDER BY dataID DESC LIMIT 6";  //This is where I specify what data to query
    //         $result = mysqli_query($db, $sql);
        
    //         $data2 = array();
    //         while($enr = mysqli_fetch_assoc($result)){
    //             $a = array($enr['temp'], $enr['hum'], $enr['sTemp'], $enr['sMois'], $enr['sec'], $enr['ph'], $enr['n'], $enr['p'], $enr['k'], $enr['r'], $enr['b'], $enr['si']);
    //             array_push($data2, $a);
    //         }
        
    //         echo json_encode($data2);

    //     }

    // }

    
    $sql = "SELECT * FROM data_values WHERE userID = 'id_0001' ORDER BY dataID DESC LIMIT 6";  //This is where I specify what data to query
    $result = mysqli_query($db, $sql);

    $data2 = array();
    while($enr = mysqli_fetch_assoc($result)){
        $a = array($enr['temp'], $enr['hum'], $enr['sTemp'], $enr['sMois'], $enr['sec'], $enr['ph'], $enr['n'], $enr['p'], $enr['k'], $enr['r'], $enr['b'], $enr['si']);
        array_push($data2, $a);
    }

    echo json_encode($data2);
?>
