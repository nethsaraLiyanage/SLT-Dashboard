<?php
    include('session.php');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" cbltent="width=device-width, initial-scale=1.0, user-scalable=no">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript">
  </script>
  <script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
  </script>

  <link rel="apple-touch-icon" sizes="76x76" href="./logo1.png">
  <link rel="icon" type="image/png" href="./logo1.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    Smart Farming Dashboard by SLT DigitalLab
  </title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/lacity/css/font-awesome.min.css">
  <!-- CSS Files -->
  <link href="assets/css/material-dashboard.css?v=2.1.0" rel="stylesheet" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="assets/demo/demo.css" rel="stylesheet" />

  <link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Roboto:100,300,400'>
  <link rel="stylesheet" href="assets/css/style.css">

</head>

<body class="dark-edition" onload="MQTTconnect()">

<style>
  .selopt{
    background-color: #384F66;
    width: 90%;
    border: none;
    padding: 4%;
    color: #aaaaaa;
  }
  .srchbtn{
    background-color: #E36464;
    width: 40%;
    margin-top: 15px;
    padding: 8px;
    border: none;
    color: #ffffff;
  }
  .indicator{
    border:none;
    background-color: #B22222;
    color: #ffffff;
    padding: 5px 10px 5px 10px;
    width: 100%;
  }
</style>

  <div class="wrapper ">
    <div class="sidebar" data-color="purple" data-background-color="black" data-image="assets/img/sidebar-2.jpg">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->
      <div class="logo">
        <a href="https://www.sltdigitallab.lk/" class="simple-text logo-normal">
          <img src="slt.png" alt="logo" width="220">
        </a>

        <h5 style="margin-left: 25%; color: white;">
          <?php
            echo $_SESSION['login_username']
          ?>
        </h5>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="material-icons">dashboard</i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="map.html">
              <i class="material-icons">location_ons</i>
              <p>Maps</p>

            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="createFarm.php">
              <i class="material-icons">house</i>
              <p>Add A New Farm</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->

      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
        <div class="container-fluid">
          <div class="navbar-wrapper">


              <!-- <form id="mainForm" name="mainForm">
                <div style="display:flex;">
      
                  <div class="select" tabindex="1" style="margin-left:5%;">
                       
                      <select name="city" id="location" value="" class="selopt">
                        <option value="">Select Location</option>
                        <?php
                          include "config.php"; // Using database connection file here
                          $records = mysqli_query($db,"SELECT * FROM location WHERE userID = 'user001'"); // fetch data from database
                          while($data = mysqli_fetch_array($records))
                          {
                        ?> 
                        <option value="<?php echo $data['locID']; ?>"><?php echo $data['city']; ?></option>
                        
                        <?php
                          }
                        ?>
                      </select>

                      <?php mysqli_close($db); // Close connection ?>

                        
                  </div>
                  <div class="select" tabindex="1" style="margin-left:0%;">
                      <select name="farm" id="farm" value="Farm" class="selopt">
                        <option value="">Select Farm</option>
                        <?php

                          include "config.php"; // Using database connection file here

                          $records2 = mysqli_query($db,"SELECT * FROM farm WHERE userID = 'user001'"); // fetch data from database

                          while($data2 = mysqli_fetch_array($records2))
                          {
                        ?> 
                        <option value="fm_00"><?php echo $data2['farmId']; ?></option>
                        
                        <?php
                          }
                        ?>
                      </select>
                      
                  </div>

                  <button class="srchbtn">Check Details</button>
                </div>
              </form> -->
          </div>


          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">
                  <i class="material-icons">dashboard</i>
                  <p class="d-lg-none d-md-block">
                    Stats
                  </p>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="javscript:void(0)" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="d-lg-none d-md-block">
                    Some Actions
                  </p>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="material-icons">person</i>
                  <p class="d-lg-none d-md-block">
                    Account
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="logout.php">Log out</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->

      <div class="content">
        <div class="container-fluid">

          <div class="row">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">thermostat</i>
                  </div>
                  <p class="card-category">Temprature</p>
                  <h3 class="card-title"><span id="temp"></span><small>&nbsp; c</small>
                  </h3>
                </div>
                <div class="center">
                    <div>
                      <button id="indicator-temp" class="indicator">Senser Down</button>
                    </div>
                    <div id="task-temp" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="atemp"> 30.0</p><small>c</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">water_drop</i>
                  </div>
                  <p class="card-category">Moisture</p>
                  <h3 class="card-title"><span id="mois"></span><small>g/m<sup>3</sup></small></h3>
                </div>
                 <div class="center">
                    <div>
                      <button  id="indicator-mois" class="indicator"></button>
                    </div>
                    <div id="task-mois" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="amois"> 95.0</p><small>g/m<sup>3</sup></small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">wb_sunny</i>
                  </div>
                  <p class="card-category">Light (Lux)</p>
                  <h3 class="card-title"><span id="lux"></span><small>lx</small></h3>
                </div>
               <div class="center">
                    <div>
                      <button  id="indicator-lux" class="indicator"></button>
                    </div>
                    <div id="task-lux" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                   <i class="material-icons">functions</i> Average :&nbsp; <p id="alux"> 200.0</p><small>lx</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">water_drop</i>
                  </div>
                  <p class="card-category">Humidity</p>
                  <h3 class="card-title" ><span id="hum"></span><small>kg<sup>2</sup></small></h3>
                </div>
                <div class="center">
                    <div>
                      <button  id="indicator-hum" class="indicator"></button>
                    </div>
                    <div id="task-hum" class="chart-circle "></div>
                </div>
                <div class="card-footer">  
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="ahum"> 7.0</p><small>kg<sup>2</sup></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
                      


          <div class="row">
            <div class="col-xl-4 col-lg-12">
              <div class="card card-chart">
                <div class="card-header card-header-success">
                  <div class="ct-chart" id="dailySalesChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Moisture Analysis</h4>
                  <p class="card-category">
                    <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> Recent Data Analysis</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-12">
              <div class="card card-chart">
                <div class="card-header card-header-warning">
                  <div class="ct-chart" id="websiteViewsChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Temprature Analysis</h4>
                  <p class="card-category">Recent Data Analysis</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> data collect 4 minutes ago
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-12">
              <div class="card card-chart">
                <div class="card-header card-header-danger">
                  <div class="ct-chart" id="completedTasksChart"></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Light Analysis</h4>
                  <p class="card-category">Recent Data Analysis</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> data collect 4 minutes ago
                  </div>
                </div>
              </div>
            </div>
          </div>



          
          <div class="row">
            <div class="col-md-4">
              <div class="card card-info bg-info-gradient">
                <div class="card-body">
                  <h4 class="mb-1 fw-bold">Tasks Progress</h4>
                  <div id="task-complete" class="chart-circle mt-4 mb-3"></div>
                    
                      <div id="status">Connection Status: Not Connected</div>
                      <p id="messages"></p>
                </div>

              </div>
            </div>

            <div class="col-md-4">
              <div class="card card-info bg-info-gradient">
                <div class="card-body">
                  <h4 class="mb-1 fw-bold">Tasks Progress</h4>
                  <div id="task-complete" class="chart-circle mt-4 mb-3"></div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-info bg-info-gradient">
                <div class="card-body">
                  <h4 class="mb-1 fw-bold">Tasks Progress</h4>


                  <div id="task-complete" class="chart-circle mt-4 mb-3"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left">
            <ul>
              <li>
                <a href="https://www.sltdigitallab.lk/">
                  SLT Digital
                </a>
              </li>
              <li>
                <a href="https://www.sltdigitallab.lk/our-team/">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://www.sltdigitallab.lk/contact/">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://www.sltdigitallab.lk/category/projects/">
                  Our Work
                </a>
              </li>
            </ul>
          </nav>
          <div class="copyright float-right" id="date">
            , made with <i class="material-icons">favorite</i> by
            <a href="https://www.sltdigitallab.lk/" target="_blank">SLT Digital</a> for a better web.
          </div>
        </div>
      </footer>
      <script>
        const x = new Date().getFullYear();
        let date = document.getElementById('date');
        date.innerHTML = '&copy; ' + x + date.innerHTML;
      </script>
    </div>
  </div>
 
  <!--   Core JS Files   -->
  <script src="assets/js/core/jquery.min.js"></script>
  <script src="assets/js/core/popper.min.js"></script>
  <script src="assets/js/core/bootstrap-material-design.min.js"></script>
  <script src="https://unpkg.com/default-passive-events"></script>
  <script src="assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
  <!-- Place this tag in your head or just before your close body tag. -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
   <!-- Google Maps Plugin    -->
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
  <!-- Chartist JS -->
  <script src="assets/js/plugins/chartist.min.js"></script>
  <!--  Notifications Plugin    -->
  <script src="assets/js/plugins/bootstrap-notify.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="assets/js/material-dashboard.js?v=2.1.0"></script>
  <!-- Material Dashboard DEMO methods, don't include it in your project! -->
  <script src="assets/demo/demo.js"></script>
  
  
  <!-- Chart Circle -->
  <script src="assets/js/plugin/chart-circle/circles.min.js"></script>
  <script src="assets/js/index.js"></script>

  
  <script>
    $(document).ready(function() {
      $().ready(function() {
        $sidebar = $('.sidebar');

        $sidebar_img_container = $sidebar.find('.sidebar-background');

        $full_page = $('.full-page');

        $sidebar_responsive = $('body > .navbar-collapse');

        window_width = $(window).width();

        $('.fixed-plugin a').click(function(event) {
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
              event.stopPropagation();
            } else if (window.event) {
              window.event.cancelBubble = true;
            }
          }
        });

        $('.fixed-plugin .active-color span').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
          }
        });

        $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-background-color', new_color);
          }
        });

        $('.fixed-plugin .img-holder').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $sidebar_img_container.fadeIn('fast');
            });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
              $full_page_background.fadeIn('fast');
            });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
        });

        $('.switch-sidebar-image input').change(function() {
          $full_page_background = $('.full-page-background');

          $input = $(this);

          if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
            }

            background_image = true;
          } else {
            if ($sidebar_img_container.length != 0) {
              $sidebar.removeAttr('data-image');
              $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
              $full_page.removeAttr('data-image', '#');
              $full_page_background.fadeOut('fast');
            }

            background_image = false;
          }
        });

        $('.switch-sidebar-mini input').change(function() {
          $body = $('body');

          $input = $(this);

          if (md.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            md.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
            }, 300);
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
            clearInterval(simulateWindowResize);
          }, 1000);

        });
      });
    });
  </script>
  <script>
    $(document).ready(function() {
      // Javascript method's body can be found in assets/js/demos.js
      md.initDashboardPageCharts();

    });

  </script>


</body>

</html>