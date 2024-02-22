      $("[data-trigger]").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#side_bar').toggleClass("show");
        $('body').toggleClass("offcanvas-active");
        $(".screen-overlay").toggleClass("show");
    }); 

    $(document).on('keydown', function(event) {
        if(event.keyCode === 27) {
           $(".offcanvas").removeClass("show");
           $(".screen-overlay").removeClass("show");
           $("body").removeClass("overlay-active");
        }
    });

    $(".btn-close, .screen-overlay").click(function(e){
        $(".screen-overlay").removeClass("show");
        $(".offcanvas").removeClass("show");
        $("body").removeClass("offcanvas-active");
    }); 
