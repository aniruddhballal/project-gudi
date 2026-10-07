<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>:: Akhila Bharath Sri Vasavi Penugonda Temple Trust ::</title>
    <meta content="" name="description">
    <meta content="" name="keywords">
    
    <!-- icons -->
    <link href="assets/images/logo.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.3.2/css/simple-line-icons.css"> 
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/icofont/icofont.min.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="assets/vendor/venobox/venobox.css" rel="stylesheet">
    <link href="assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="assets/css/radio-button.css" rel="stylesheet">
    <link href="assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="assets/css/jquery.fancybox.css" rel="stylesheet">
    <link href="assets/css/radio-button.css" rel="stylesheet">
    <link href="assets/css/animate.css" rel="stylesheet">

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>
    
    <!-- Datepicker JS -->
    <script src="assets/js/moment.min.js"></script>
    <script src="assets/js/bootstrap-datetimepicker.min.js"></script>
    <script src="assets/js/jquery.fancybox.pack.js"></script>

    <!-- Vendor JS Files -->
    <script src="assets/vendor/jquery/jquery.min.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
    <script src="assets/vendor/php-email-form/validate.js"></script>
    <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
    <script src="assets/vendor/venobox/venobox.min.js"></script>
    <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
    <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>

    <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

    <!-- Template Main JS File -->
    <script src="assets/js/main.js"></script>

    <!-- Custom CSS -->
    <!--link href="assets/css/style1.css" rel="stylesheet"-->
    <link href="assets/css/style.css" rel="stylesheet">

  </head>
  <body>
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

  <!-- Header -->


  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center">
      <a href="index.html"><img src="assets/images/logo.png" class="img-responsive" style="width: 100%;"></a>
      <h1 class="logo"><a href="index.html">Akhila Bharath Sri Vasavi Penugonda Temple Trust</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav class="nav-menu d-none d-lg-block">

        <ul>
          <li ><a href="./index.php">Home</a></li>
          <li class="drop-down"><a href="#">Overview</a>
            <ul>
              <li ><a href="./overview.php">Overview</a></li>
              <li ><a href="./news.php">News</a></li>
              <li ><a href="news-letter.php" >Newsletter</a></li>
            </ul>
          </li>
          <li class="drop-down"><a href="#">Services</a>
            <ul>
              <li ><a href="vasavidham.php">Vasavidham</a></li>
              <!-- <li ><a href="gurupeetam.php">Gurupeetam</a></li>
              <li ><a href="milestones.php" >Milestones</a></li>
              <li ><a href="sevas.php" >Sevas, Pujas, Homas</a></li> -->
            </ul>
          </li>
          <li ><a href="story.php">Story</a></li>
          <li class="drop-down"><a href="#">Donations</a>
            <ul>
              <li ><a href="donation_annadanam.php">Annadanam</a></li>
              <li ><a href="donation_goshala.php">Go- Shala</a></li>
              <li ><a href="donation_ehundi.php" >E Hundi</a></li>
            </ul>          
          </li>
          <li ><a href="team.php">Trustees</a></li>
          <li class="drop-down"><a href="#">Gallery</a>
            <ul>
              <li ><a href="photos.php">Photos</a></li>
              <li ><a href="videos.php">Videos</a></li>
            </ul>
          </li>
          <li ><a href="contact.php">Contact</a></li>
        </ul>
      </nav><!-- .nav-menu -->
    </div>
  </header><!-- End Header -->


<script>
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
</script>

  <!-- Header -->
  <!-- ======= Hero Section ======= -->
  <section id="hero">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-ride="carousel">

      <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

      <div class="carousel-inner" role="listbox">
              <!-- Slide 1 -->
        <div class="carousel-item active" style="background-image: url(assets/images/photos/16x9/1.jpg)">
          <div class="carousel-container">
            <div class="container">
              <!--<h2 class="animate__animated animate__fadeInDown"><span>Vasavi Penugonda Trust</span></h2>
              <p class="animate__animated animate__fadeInUp">The Trust was formed exclusively to develop the only Punya Kshetra for Arya Vysyas and to spread global awareness of Goddess Vasavi Mata’s significance, Story and Birth Place.</p>
              <a href="#about.php" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a> -->
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item" style="background-image: url(assets/images/photos/16x9/vasavi5.jpg)">
          <div class="carousel-container">
            <div class="container">
              <!--<h2 class="animate__animated animate__fadeInDown">Vasavidham</h2>
              <p class="animate__animated animate__fadeInUp">Details of World's tallest 90 ft. tall Panchaloha idol of Matha Vasavi in the sanctum sanctorum of Vasavi Rishi Gothra Suvarna Mandir.</p>
              <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a> -->
            </div>
          </div>
        </div>

        <!-- Slide 3 -->
        <div class="carousel-item" style="background-image: url(assets/images/photos/16x9/3.jpg)"> -->
          <div class="carousel-container">
            <div class="container">
              <!--<h2 class="animate__animated animate__fadeInDown">Story Vasavi Kanyakaparameshwari</h2>
              <p class="animate__animated animate__fadeInUp">Devine story of Godess Vasavi Kanyakaparameshwari.</p>
              <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a> -->
            </div>
          </div>
        </div>

        <!-- Slide 4 -->
        <div class="carousel-item" style="background-image: url(assets/images/photos/16x9/vasaviFull.jpg)">
          <div class="carousel-container">
            <div class="container">
              <!--<h2 class="animate__animated animate__fadeInDown">Seva Details</h2>
              <p class="animate__animated animate__fadeInUp">Donate to Sevas to help bring Vasavi Dham to life..</p>
              <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a> -->
            </div>
          </div>
        </div>

        <!-- Slide 5 --> -->
        <div class="carousel-item" style="background-image: url(assets/images/photos/16x9/vasaviFull1.JPG)">
          <div class="carousel-container">
            <div class="container">
             <!--<h2 class="animate__animated animate__fadeInDown">Trustees</h2>
              <p class="animate__animated animate__fadeInUp">Details of the Vasavi Penugonda Trust's trustees and Office bearers.</p>
              <a href="#about" class="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</a> -->
            </div>
          </div>
        </div>

      </div>

      <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon icofont-simple-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>

      <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon icofont-simple-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>

    </div>
  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row content">
          <div class="col-lg-6">
            <h2 style="color: #444444;">Akhila Bharath Sri Vasavi Penugonda Temple Trust</h2>
            <h3>The Trust was formed exclusively to develop the only Punya Kshetra for Arya Vysyas and to spread global awareness of Goddess Vasavi Mata’s significance, Story and Birth Place.</h3>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p><b>Aims & objectives of the Trust</b></p>
            <ul>
              <li><i class="ri-check-double-line"></i> To develop Penugonda on par with Kasi, Tirumala, Annavaram,Bhadrachalam, Simhachalam etc.,</li>
              <li><i class="ri-check-double-line"></i> To provide accommodation, free food, free Hostels and Hospitals</li>
              <li><i class="ri-check-double-line"></i> To build Vasavi Rishi Gothra Suvarna Mandir.</li>
              <li><i class="ri-check-double-line"></i> To install world's tallest 90 ft. tall Panchaloha idol of Matha Vasavi.In the sanctum sanctorum of Vasavi Rishi Gothra Suvarna Mandir</li>
              <li><i class="ri-check-double-line"></i> To preach & spread the principles of non-violence, love, peace and sacrifice amongst the to the world.</li>
              <li><i class="ri-check-double-line"></i> To inspire Vysyas spread all over the world to visit Penugonda at least once during their life time.</li>
              <li><i class="ri-check-double-line"></i> To finalise the history of Penugonda & Pooja vidhanas, Astothara /Sahasra Namavali of Vasavi and to adopt the same in all Vasavi Temples worldwide.</li>
              <li><i class="ri-check-double-line"></i> To start Veda Patasala, Guru Peetam, Educational Institutions, up todeemed University, Old Age Home, Widow rehabilitation Centre. </li>
              <li><i class="ri-check-double-line"></i> To perform free Marriages and To setup libraries for in depth study of Vasavi charithra etc.</li>
            </ul>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->

    <!-- ======= About Section ======= -->
    <section id="Message" class="about">
      <div class="container">
        <div class="section-title">
          <h1>President's</h1>
          <p>Message to Devotees</p>
        </div>

        <div class="row content">
          <div class="col-lg-4 pt-4 pt-lg-0">
              <img src="assets/images/president_penugonda.jpg" class="img-responsive center-block" style="width:95%;border-radius: 5%;">          
          </div>      
          <div class="col-lg-4 pt-4 pt-lg-0">
            <p style="color: #444444;">ನನ್ನ ನಲ್ಮೆಯ ವಾಸವಿ ಭಕ್ತಾದಿಗಳೆ!</p>    
            <p style="color: #444444;">ಜಾಗನ್ಮಾತೆ ಆದಿಶಕ್ತಿ ಸ್ವರೂಪಿಣಿ ಅಹಿಂಸಾ ತತ್ವವನ್ನು ವಿಶ್ವಕ್ಕೆ ಪ್ರಪ್ರಥಮವಾಗಿ ಬೋಧಿಸಿದ ತಾಯಿ 
ಶ್ರೀ ಮದ್ ವಾಸವಿ ಕನ್ಯಕಾಪ್ರಮೆಶ್ವರಿ ಜನ್ಮ ತಾಳಿ 102 ಗೊತ್ರಜರೊಂದಿಗೆ ಅಗ್ನಿಪ್ರವೇಶ ಮಾಡಿ ತನ್ಮೂಲಕ ಯುದ್ಧವನ್ನು ನಿಲ್ಲಿಸಿದ ಆದರ್ಶನಿಯಳು ಪ್ರಾಥಸ್ಮರಣೀಯು ಆದ ವಾಸವಿ ಕನ್ಯಕಾಪರಮೇಶ್ವರಿಯು ಅಹಿಂಸಾ ತತ್ವವನ್ನು ವಿಶ್ವಕ್ಕೆ ಪ್ರಪ್ರಥಮವಾಗಿ ಬೋಧಿಸಿದರು, ತಮ್ಮ ಮನೆಗಳಲ್ಲಿ ನಡೆಯೋ ಶುಭಾ ಕಾರ್ಯಗಳಾದ - ಉಪನಯನ, 60ವರ್ಷದ ಶಾಂತಿ, ಮದುವೆ ಮುಂತಾದ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಪುಣ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ ಮಾಡಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ. ಎಲ್ಲಾ ಅನುಕೂಲಗಳನ್ನೂ ಹೊಂದಿರುವ ವಾಸವಿ ಶಂತಿಧಾಮದಲ್ಲಿ ತಾವು ಶುಭ ಕಾರ್ಯಗಳನ್ನು ಸುಸೂತ್ರವಾಗಿ ನಡೆಸಲು ನಮ್ಮ ಸಿಬ್ಬಂದಿಯು ತಮ್ಮೊಂದಿಗೆ ಸಹಕಾರ ನೀಡುತ್ತದೆ ಮುಂದಿನ ತಿನಗಳಲ್ಲಿ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಾಗಲಿರುವ ಈ ಪುಣ್ಯ ಸ್ಥಳವನ್ನು ನಿರ್ಮಾಣಮಾಡಿ ಇದನ್ನು ಲೋಕಾರ್ಪಣೆ ಮಾಡುವ ಸಮಯ ಈಗ ಬಂದಿದೆ ತಾವೆಲ್ಲರೂ ಪೆನುಗೊಂದೆಗೆ ಬಂದು ವಾಸವಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ..</p>
 ಪೆನುಗೊಂದೆಗೆ ಬಂದು ವಾಸವಿ ಮಾತೆಯ ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಕೊರುತ್ತಿದ್ದೇನೆ.           </p> <p style="color: #444444;">ಜೈ ವಾಸವಿ!!!</p>
            <p style="color: #444444;">ಡಾ. ಪಿ. ಎನ್ ಗೋವಿಂದರಾಜುಲು</p>
            <p style="color: #444444;">ಅಧ್ಯಕರು </p>
            <p style="color: #444444;">ಅಖಿಲ ಭಾರತ ಶ್ರೀ ವಾಸವಿ ಪೆನುಗೊಂಡ.</p>

          </div>
          <div class="col-lg-4 pt-4 pt-lg-0">
            <p style="color: #444444;">Dear vasavi devotees!</p>    
            <p style="color: #444444;">It gives me great pleasure to invite you all to the birth place of shree madd vasavi kanyakaparameshwari the incornition of aadi paraashakti, she entered into  secret fire along with 102 gothraja's to mark the beginning of non-violence on  this earth, she is the deety of all arya vysya's world wide and I invite you all to visit penugonda kshetram atleast once in two years.
Upanayana's, Marriages can be performed comfortably at penugonda and the of matha vasavi is very very essential for the newly married couple, 60th, 70th, & 80th year birthday an centenary  celebrations and family get  togethers can also be performed at penugonda kshetram. Keep watching our website frequently so that you can update your knowledge about penugonda kshetram, onceagain I invite you all to penugonda kshetram to visit, to take blessings of godess kanyaka prameshwary.</p>
            <p style="color: #444444;">Jai vasavi!!!</p>
            <p style="color: #444444;">Dr. Govindaraajulu</p>
            <p style="color: #444444;">President </p>
            <p style="color: #444444;">Akhila bharata vasavi penugonda trust</p>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->


    <!-- ======= Clients Section ======= -->
    <section id="clients">
      <div class="container">
        <div class="section-title">
          <h2>Major</h2>
          <p>Links</p>
        </div>

        <div class="row">
            <div class="col-md-3" >
                <div class="icon-box mr-2" style="background-color: antiquewhite;border-radius: 10%;">
                  <p style="font-size: xx-large;color: brown;text-align: center;padding:30px;"><a href="vasavidham.php">Vasavidham</a></p>
                </div>
            </div>
            <div class="col-md-3  mt-4 mt-md-0">
                <div class="icon-box mr-2" style="background-color: antiquewhite;border-radius: 10%;">
                  <p style="font-size: xx-large;color: brown;text-align: center;padding:30px;"><a href="photos.php">Gallery</a></p>
                </div>
            </div>
            <div class="col-md-3  mt-4 mt-md-0">
                <div class="icon-box mr-2" style="background-color: antiquewhite;border-radius: 10%;">
                  <p style="font-size: xx-large;color: brown;text-align: center;padding:30px;"><a href="donations.php">Donation</a></p>
                </div>
            </div>
            <div class="col-md-3 mt-4 mt-md-0">
                <div class="icon-box  mr-2" style="background-color: antiquewhite;border-radius: 10%;">
                  <p style="font-size: xx-large;color: brown;text-align: center;padding:30px;"><a href="contact.php">Contact Us</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- ======= Services Section ======= -->
    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Events</h2>
          <p>Upcoming Events</p>
          <h4><p style="text-align: center;"> 
            
            19.07.2024 to 21.02.2024 - Guru Pournima Celebrations</p></h4>
            <a href="https://vasavipenugonda.com//News_letter_files/Bulletin%20-%207%202021.pdf" target="_blank" > <button type="submit" class="download_btn" >Click Here
            </button> </a>

        </div>

        <div class="row">
                  
        </div>

      </div>
    </section><!-- End Services Section -->


<!-- Photos -->
    <div class="container">
        <div class="section-title">
          <h2>Great Souls</h2>
          <p>Behind the Project</p>
        </div>
        <div class="row bg-grey">
                <div class="col-md-3 col-xs-12 pull-right">
                <img src="assets/images/im1.jpg" class="img-responsive founder_img center-block">
            </div>
            <div class="col-md-9">
                <div class="heading">LATE S. RAMA MURTHY, BANGALORE</div>
                <div class="heading_small">Founder President, Vysya Ratna, Vasuvi Seva Ratna</div>
                <p class="discription">The inspiration for Vasavi Shanti Dham and a major driving force behind this was Vysya Ratna, Vasavi Seva Ratna Late Sri S Rama Murthy. Founder President of Akhila Bharat Vasavi Penugonda Trust and Proprietor of Murthy Glass and Plywoods, Bangalore.</p>
                <p class="discription">The Project was originally conceived by his beloved wife Smt. S Subhashini</p>
            </div>
        </div>

        <div class="row bg-grey">
            <div class="col-md-3 col-xs-12">
                <img src="assets/images/im2.jpg" class="img-responsive founder_img1 center-block">
            </div>

            <div class="col-md-9">
                <div class="heading">Dr. P.N. Govindarajulu</div>
                <div class="heading_small">The Man behind the Mission</div>
                <p class="discription">Working tirelessly to bring Vasavi Shanti Dham to fruition is Dr. P N Govindarajulu, President of the Trust and previously, General Secretary. He has served as National Vice President of the Indian Medical Association and is also currently the President of Malleswaram Arya Vysya Sangha</p>
            </div>
        </div>
    </div>


<div class="container">
        <div class="col-md-12">
            <p>The Trust is deeply indebted to the moral and financial support provided by leaders and members of the community: </p>
        </div>

<div class="row">
        <div class="col-xs-6 col-md-6">
            <div class="row">
                <div class="col-md-12 text-center">
                    <img src="assets/images/im3.jpg" style="border: 3px solid #fdd40d;">
                </div>
                <div class="col-md-12 text-center">
                    <div class="profile_heading">Sri Konijeti Rosaiah</div>
                    <div class="profile_heading_small">Former Chief Minister of Andhra Pradesh and Former Governor of Tamil Nadu</div>
                </div>
            </div>
        </div>

        <div class="col-xs-6 col-md-6">
            <div class="row">
                <div class="col-md-12 text-center">
                    <img src="assets/images/im4.jpg" style="border: 3px solid #fdd40d;">
                </div>
                <div class="col-md-12 text-center">
                    <div class="profile_heading">Sri D H Shankara Murthy</div>
                    <div class="profile_heading_small">Former Chairman Karnataka Legislative Assembly</div>
                </div>
            </div>
        </div>
    </div>


<div class="row">
        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im5.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri G Mallikarjuna Rao</div>
                    <div class="profile_heading_small">Chairman, GMR Group</div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im6.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri K R Pradeep</div>
                    <div class="profile_heading_small">Former Chairman, Lakshmi Vilas Bank</div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im7.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Dr. Ramesh Makam</div>
                    <div class="profile_heading_small">AV Hospital, Bangalore</div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im8.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Dr. Saraswati Ramesh</div>
                    <div class="profile_heading_small">AV Hospital, Bangalore</div>
                </div>
            </div>
        </div>
    </div>

<div class="row">
        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im9.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri B K Manjunath</div>
                    <div class="profile_heading_small">Chairman Lakshmi Vilas Bank</div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im10.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri Kotla Prasad Rao</div>
                    <!-- <div class="profile_heading_small">Former Chairman Karnataka Legislative Assembly</div> -->
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im12.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri Vasanad Premnath Gopal</div>
                    <!-- <div class="profile_heading_small">Former Chairman Karnataka Legislative Assembly</div> -->
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im13.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri D V Manjunath</div>
                    <div class="profile_heading_small">Chairman and CEO EMVEE Solar</div>
                </div>
            </div>
        </div>
    </div>


        <div class="col-xs-12 col-md-12 text-center">
            <div class="profile_heading">People behind the Suvarna Gotra Mandir and 90 Ft High Pancha Loha Idol</div>
            <div class="profile_heading_small">The following individuals have worked enormously to the construction of the Suvarna Rishi Mandir and 90 Ft. Pancha Loha Idol</div>
        </div>

        <div class="row">
        <div class="col-md-4">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im14.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri Satish</div>
                    <div class="profile_heading_small">Architect of The Temple &amp; Chairman, Technical Committee</div>
                </div>
            </div>
        </div>


        <div class="col-md-4">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im15.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri Nagendra Kumar</div>
                    <div class="profile_heading_small">Structural Engineer</div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="row">
                <div class="col-xs-12 col-md-12 text-center">
                    <img src="assets/images/im16.jpg" class="img-responsive" style="display: inline-block; border: 3px solid #fdd40d;">
                </div>
                <div class="col-xs-12 col-md-12 text-center">
                    <div class="profile_heading">Sri K S V Raja</div>
                    <div class="profile_heading_small">Spl Class Contractor</div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Photos -->





    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio">
      <div class="container">

        <div class="section-title">
          <h2>Gallery</h2>
          <p>Recent Photos</p>
        </div>

        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-app">Temple</li>
              <li data-filter=".filter-card">Events</li>
              <li data-filter=".filter-web">Pooja</li>
            </ul>
          </div>
        </div>

        <div class="row portfolio-container">

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/2.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>App 1</h4>
                <p>App</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/2.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/3.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Web 3</h4>
                <p>Web</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/3.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/4.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>App 2</h4>
                <p>App</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/4.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/5.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Card 2</h4>
                <p>Card</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/5.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/6.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Web 2</h4>
                <p>Web</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/6.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/7.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>App 3</h4>
                <p>App</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/7.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/8.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Card 1</h4>
                <p>Card</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/8.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-card">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/9.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Card 3</h4>
                <p>Card</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/9.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 portfolio-item filter-web bx">
            <div class="portfolio-wrap">
              <img src="assets/images/photos/16x9/10.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <!-- <h4>Web 3</h4>
                <p>Web</p> -->
                <div class="portfolio-links">
                  <a href="assets/images/photos/16x9/10.jpg" data-gall="portfolioGallery" class="venobox" title="RECENT PHOTOS"><i class="bx bx-plus"></i></a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Portfolio Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-4 col-md-6">
            <div class="footer-info">
              <h3>Trust Head Office</h3>
              <p>
                No. 19,20 & 20/1, Badaganadu Sangha Building <br>
                Girls School Street, Kumara Park West, <br>
                Bangalore – 560 020<br><br>
                <strong>Phone:</strong> 080 - 23360555<br>
                <strong>Mobile:</strong> 9164001400 (Harish)<br>
                <strong>Email:</strong> vasavipenugonda@gmail.com<br>
              </p>
              <div class="social-links mt-3">
                <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="footer-info">
              <h3>Vasavi Shanthi Dham</h3>
              <p>
                Vasavi Shanti Dham <br>
                Penugonda – 534 320<br>
                W.G. District, AP<br><br>
                <strong>Phone:</strong> 08819 –246252 / 248686<br>
                <strong>Mobile:</strong> 9912018818 - Penugonda (Janardhan)<br>
                <strong>Mobile:</strong> 7899996868 - Penugonda (Harish)<br>
                <strong>Email:</strong> vasavipenugonda@gmail.com<br>
              </p>
            </div>
          </div>


          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Enter your email id to subscribe for newsletter</p>
            <form id="subscribe" action="forms/subscribe.php" method="post">
              <input type="email" id="email" name="email" placeholder="Your Email" required>
              <input type="submit" value="Subscribe">
            </form>
            <h4 class="mt-4"><a href="https://vasavipenugonda.com/privacy.php">Website and Mobile App Privacy Policy</a></h4>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>2010-2020 Akhila Bharat Sri Vasavi Penugonda Temple Trust (R)</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="http://vs-infotech.co.in/">VS Infotech</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <script src="assets/vendor/jquery/jquery.validate.min.js"></script>
  <script type="text/javascript">
  var frm = $('#subscribe');

    frm.submit(function (e) {

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
              alert('Subscribe was successful for newsletter.');
              $("form")[0].reset();
            },
            error: function (data) {
              alert("something went wrong please try again");
                // console.log('An error occurred.');
                // console.log(data);
            },
        });
    });    
  </script>
  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/venobox/venobox.min.js"></script>
  <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
  <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

</body>

</html>