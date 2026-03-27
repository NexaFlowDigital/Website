$(document).ready(function(){

    // 1) FILTER / GROUPING
    $(".button").click(function(){
      // toggle active class
      $(this).addClass("active").siblings().removeClass("active");
  
      var filter = $(this).attr("data-filter");
  
      if (filter === "all") {
        $(".gallery .image").show(400);
      } else {
        $(".gallery .image").not("." + filter).hide(200);
        $(".gallery .image").filter("." + filter).show(400);
      }
    });
  
    // 2) MAGNIFIC-POPUP (only on your preview thumbnails)
    $(".gallery").magnificPopup({
      delegate: "a.view-btn",      // <-- only links with .view-btn
      type: "image",
      removalDelay: 500,           // allow out-animation
      gallery: { enabled: true },
  
      callbacks: {
        beforeOpen: function() {
          // add mfp-with-anim class for your animations
          this.st.image.markup = this.st.image.markup
            .replace('mfp-figure', 'mfp-figure mfp-with-anim');
          this.st.mainClass = this.st.el.attr("data-effect");
        }
      },
  
      closeOnContentClick: true,
      midClick: true  // open on middle mouse click
    });
  
  });