<?php
    extract($_POST);
    include("config.php");
    $sql=mysqli_query($db,"SELECT * FROM user where email='$email'");
    if(mysqli_num_rows($sql)>0)
    {
        echo "Email Id Already Exists"; 
        exit;
    }
    else(isset($_POST['save']))
    {
        $query="INSERT INTO user(id, fullName, username, password, email) VALUES ('user002','$fullName', '$username', '$password','$email');"
        $status = mysqli_query($db,$query)or die("Could Not Perform the Query");
        header ("Location: login.php?status=success");
        // $file = rand(1000,100000)."-".$_FILES['file']['name'];
        // $file_loc = $_FILES['file']['tmp_name'];
        // $folder="upload/";
        // $new_file_name = strtolower($file);
        // $final_file=str_replace(' ','-',$new_file_name);
        // if(move_uploaded_file($file_loc,$folder.$final_file))
        // {
        //     $query="INSERT INTO register(First_Name, Last_Name, Email, Password, File ) VALUES ('$first_name', '$last_name', '$email', 'md5($pass)', '$final_file')";
        //     $sql=mysqli_query($conn,$query)or die("Could Not Perform the Query");
        //     header ("Location: login.php?status=success");
        // }
        // else 
        // {
        //     echo "Error.Please try again";
        // }
    }

?>