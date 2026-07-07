$(document).ready(function(){

  $('.scroll-top').hide();

  /*--------------- Navbar Toggler ---------------*/
  $('#menu-btn').click(function(e){
    e.stopPropagation();
    $(this).toggleClass('fa-times fa-bars');
    $('.navbar').toggleClass('active');
  });

  // Close nav when a link is clicked
  $('.navbar a').click(function(){
    $('.navbar').removeClass('active');
    $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
  });

  // Close nav when clicking outside
  $(document).click(function(e){
    if (!$(e.target).closest('.navbar, #menu-btn').length) {
      $('.navbar').removeClass('active');
      $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
    }
  });

  /*--------------- Scroll-Top ---------------*/
  $(window).on('scroll', function(){

    $('#menu-btn').removeClass('fa-times').addClass('fa-bars');
    $('.navbar').removeClass('active');

    // STICKY HEADER
    if($(window).scrollTop() > 0){
      $(".header").addClass("sticky");
    } else {
      $(".header").removeClass("sticky");
    }

    if ($(this).scrollTop() > 100) {
      $('.scroll-top').fadeIn();
    } else {
      $('.scroll-top').fadeOut();
    }

  });

});
