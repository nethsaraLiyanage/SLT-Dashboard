<?php
    include('session.php');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="utf-8" />
  <script src="assets/js/chart.js"></script>
  <script src="assets/js/alerting.js"></script>
  <meta name="viewport" cbltent="width=device-width, initial-scale=1.0, user-scalable=no">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript">
  </script>
  <script type = "text/javascript" src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
  </script>
  <!-- card js -->
  <script src="https://code.jquery.com/jquery-3.5.0.js"></script>

  <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="assets/img/logo1.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

   <!-- Mapbox    -->
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js"></script>
  <!-- map end -->
  <title>Fazenda | Dashboard</title>
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


  <div class="wrapper ">
    <div class="sidebar" data-color="purple" data-background-color="black" data-image="assets/img/1.jpg">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->
      <div class="logo"><a href="https://www.sltdigitallab.lk/" class="simple-text logo-normal">
          <img src="assets/img/logo.png" alt="logo" width="180">
        </a>
        <h5 style="margin-left: 25%; margin-top: 5%; color: white;">
          <?php
            echo $_SESSION['login_username']
          ?>
          <!-- User 001 -->
        </h5>
      </div>

        
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item active">
            <a class="nav-link" href="#sensors">
              <i class="material-icons">dashboard</i>
              <p>Sensors</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="#map-div">
              <i class="material-icons">location_ons</i>
              <p>Map</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="#history">
              <i class="material-icons"><h3 >H</h3></i>
              <p>History</p>
            </a>
          </li>
          <!-- <li class="nav-item ">
            <a class="nav-link" href="">
              <i class="material-icons">person</i>
              <p>User Management</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="">
              <i class="material-icons">laptop</i>
              <p>Device Management</p>
            </a>
          </li> -->
        </ul>
        <li class="nav-item" style="margin-top: 95%; margin-left: 10%">
            <a class="nav-link" href="">
              <i class="material-icons"></i>
              <p>Dashboard V.01 (2021)</p>
            </a>
        </li>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->

      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <h3 style="font-family: 'Montserrat', sans-serif; color: white; margin-left:20px; ">
              Fazenda Dashboard
            </h3>

          </div>




          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <!-- <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">
                  <i class="material-icons">dashboard</i>
                  <p class="d-lg-none d-md-block">
                    Stats
                  </p>
                </a>
              </li> -->
              <!-- <li class="nav-item dropdown">
                <a class="nav-link" href="javscript:void(0)" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="material-icons">notifications</i>
                  <span class="notification">5</span>
                  <p class="d-lg-none d-md-block">
                    Some Actions
                  </p>
                </a>
              </li> -->

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

      <div class="content" id="mainpage">
        <div class="container-fluid">

        <hr id="sensors">
        <h3 style="margin-left: 20px;margin-top: 20px; color:white;">Your Sensors (Real-Time)</h3>
        <div class="row" id="sensors">
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">thermostat</i>
                  </div>
                  <p class="card-category">Soil Temprature</p>
                  <h3 class="card-title"><span id="temp"></span><small>&nbsp;c</small>
                  </h3>
                </div>
                <div class="center">
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
                    <i class="material-icons">water</i>
                  </div>
                  <p class="card-category">Soil Moisture</p>
                  <h3 class="card-title"><span id="mois"></span><small>%</small></h3>
                </div>
                 <div class="center">
                    <div id="task-mois" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="amois"> 95.0</p><small>%</small>
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
                  <p class="card-category">Air Temprature</p>
                  <h3 class="card-title"><span id="lux"></span><small>c</small></h3>
                </div>
               <div class="center">
                    <div id="task-t" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                   <i class="material-icons">functions</i> Average :&nbsp; <p id="alux"> 30.0</p><small>c</small>
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
                  <p class="card-category">Air Humidity</p>
                  <h3 class="card-title" ><span id="hum"></span><small>%</small></h3>
                </div>
                <div class="center">
                    <div id="task-hum" class="chart-circle "></div>
                </div>
                <div class="card-footer">  
                  <div class="stats" >
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="ahum"> 7.0</p><small>%</small>
                  </div>

                </div>
              </div>
            </div>

            <!--line 2-->
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <b><h3 style='padding: 10px;'>ph</h3></b>
                    <!-- <i class="material-icons">ph</i> -->
                  </div>
                  <p class="card-category">Soil PH</p>
                  <h3 class="card-title"><span id="ph"></span>
                </div>
                <div class="center">
                    <div id="task-ph" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="aph"> 30.0</p><small></small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">lightning</i>
                  </div>
                  <p class="card-category">Soil Electrical Con.</p>
                  <h3 class="card-title"><span id="sec"></span><small> mS/cm</small></h3>
                </div>
                 <div class="center">
                    <div id="task-sec" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="asec"> 95.0</p><small>mS/cm</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Soil Temperature- c
            Soil moisture-%
            Air Temperature-c
            Air Humidity-%
            PH- PH value
            Soil Electrical Conductivity- mS/cm
            Rain Fall- value*0.2 mm
            Soil nitrogen - ppm
            Soil Phosphorous -ppm
            Soil Potassium -ppm -->
            
            <!-- <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">water_drop</i>
                  </div>
                  <p class="card-category">Rain Fall</p>
                  <h3 class="card-title"><span id="rain"></span><small>mm</small></h3>
                </div>
                 <div class="center">
                    <div id="task-rain" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="arain"> 95.0</p><small>mm</small>
                  </div>
                </div>
              </div>
            </div> -->

            
          
          
          <!--line 3-->
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <b><h3 style='padding: 10px;'>N</h3></b>
                    <!-- <i class="material-icons">ph</i> -->
                  </div>
                  <p class="card-category">Soil Nitrogen</p>
                  <h3 class="card-title"><span id="sn"></span><small> ppm</small></h3>
                </div>
                <div class="center">
                    <div id="task-sn" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="asn"> 30.0</p><small>ppm</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <b><h3 style='padding: 10px;'>P</h3></b>
                    <!-- <i class="material-icons">ph</i> -->
                  </div>
                  <p class="card-category">Soil Phosphorus</p>
                  <h3 class="card-title"><span id="sp"></span><small> ppm</small></h3>
                </div>
                 <div class="center">
                    <div id="task-sp" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="asp"> 95.0</p><small>ppm</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <b><h3 style='padding: 10px;'>K</h3></b>
                    <!-- <i class="material-icons">ph</i> -->
                  </div>
                  <p class="card-category">Soil Potassium</p>
                  <h3 class="card-title"><span id="sk"></span><small> ppm</small></h3>
                </div>
                 <div class="center">
                    <div id="task-sk" class="chart-circle "></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">functions</i> Average :&nbsp; <p id="ask"> 95.0</p><small>ppm</small>
                  </div>
                </div>
              </div>
            </div>

            
          </div>

          
            <hr id="map-div">
            <div >
              <h3 style="margin-left: 20px;margin-top: 20px; color:white;">Your Farms</h3>
              <div class="row" id="maps">
                <div class="col-md-12" id="mYdiv">
                  <div class="card card-info bg-info-gradient" style="margin-top:20px ;">
                    <div class="card-body" style="padding: 0rem 0px;">
                      <div id="map"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <hr id="history">
            <h3 style="margin-left: 20px;margin-top: 50px; margin-bottom: 20px; color:white;" id="latestUpdateTime" >Sensor History</h3>

          <div class="row">
                        <!-- <div class="card-footer">
                          <div class="stats">
                            <i class="material-icons">access_time</i> <p id="latestUpdate`+i+`">Updated 5 seconds ago </p>
                          </div>
                        </div> -->
            <script>
              // console.log("its");
              // console.log(msg_obj);

            var length = Object.keys(msg_obj).length;
            for (let i = 0; i < length; i++) {  
              document.write(`
                    <div class="col-xl-6 col-lg-12">
                      <div class="card card-chart">
                        <div class="card-header card-header-danger">
                          <div class="ct-chart" id="draw_chart`+i+`"></div>
                        </div>
                        <div class="card-body">
                          <h4 class="card-title" id="chart_title`+i+`">Light Analysis</h4>
                          <p class="card-category">Recent Data Analysis</p>
                          <div style="margin-left:70%; ">
                            <button style="width:150px; height:40px; border: 1px solid red; color:red; border-radius: 20px; background:none;">View More</button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  `);
            }
            </script>

            <div class="modal-container" id="modal-opened">
              <div class="modal">

                <div class="modal__details">
                  <h1 class="modal__title">Modal Title</h1>
                  <p class="modal__description">Sentence that will tell user what this modal is for or something.</p>
                </div>

                <p class="modal__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>

                <button class="modal__btn">Button &rarr;</button>

                <a href="#modal-closed" class="link-2"></a>

              </div>
            </div>

          </div>

          
          <div class="row" >
            <div class="col">
              <div class="card card-info bg-info-gradient">
                <div class="card-body">
                  <h4 class="mb-1 fw-bold">Tasks Progress</h4>
                  <div id="task-complete" class="chart-circle mt-4 mb-3"></div>
                    
                      <div id="status">Connection Status: Not Connected</div>
                      <p id="messages"></p>
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
  <script src="assets/js/map.js"></script>
  <script type = "text/javascript" src="assets/js/chart.js"></script>
  <script type = "text/javascript" src="assets/js/alerting.js"></script>
  
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