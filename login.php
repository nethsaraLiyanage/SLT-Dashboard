<?php
   include("config.php");
   session_start();
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
      $myusername = mysqli_real_escape_string($db,$_POST['username']);
      $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
      
      $sql = "SELECT id,fullName FROM user WHERE username = '$myusername' and password = '$mypassword'";
      $result = mysqli_query($db,$sql);
      
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
        //  session_register("myusername");
         $_SESSION['login_user'] = $row['id'] ;
         $_SESSION['login_username'] = $row['fullName'] ;

         
         header("location: dashboard.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fazenda | Login</title>
    <link rel="icon" type="image/png" href="assets/img/logo1.png">
    <link rel="stylesheet" href="./assets/css/login.css">
</head>
<body>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');
</style> 

    <div class="login-wrap">
        
        <div class="login-html">
            <div class="logo-img">
                <center>
                    <img src="assets/img/logo.png" alt="" style="width: 200px; margin-top:0;">
                    <h3 style="font-family: 'Montserrat', sans-serif; color: white; margin-top:5px; margin-bottom: 10%;">
                    Fazenda Dashboard
                    </h3>
                </center>
            </div> 

            <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
            <div class="login-form">
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                    <div class="sign-in-htm">

                        <div class="group">
                            <label for="user" class="label">Username</label>
                            <input id="user" name="username" type="text" class="input " value="">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Password</label>
                            <input id="pass" name="password" type="password" class="input " data-type="password">
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" checked>
                            <label for="check"><span class="icon"></span> Keep me Signed in</label>
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Sign In">
                        </div>
                    </div>
                </form>
                <form action="register.php" method="post" enctype="multipart/form-data">
                    <div class="sign-up-htm">
                        <div class="group">
                            <!-- <label for="name" class="label">Full Name</label> -->
                            <input id="name" name="fullName" type="text" class="input" placeholder="Full Name">
                        </div>
                        <div class="group">
                            <!-- <label for="user" class="label">Username</label> -->
                            <input id="user" name="username" type="text" class="input" placeholder="Username">
                        </div>
                        <div class="group">
                            <!-- <label for="pass" class="label">Password</label> -->
                            <input id="pass" name="password" type="password" class="input" data-type="password" placeholder="Password">
                        </div>
                        <div class="group">
                            <!-- <label for="email" class="label">Email Address</label> -->
                            <input id="email" name="email" type="email" class="input" placeholder="Email Address">
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Sign Up">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>



