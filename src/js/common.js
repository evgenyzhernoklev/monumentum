$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    // check if browser supports svg
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



    // popup opening
    $body.on('click', '.popup-open', function(e) {
      e.preventDefault();
      var target = $(this).data('popup'),
          $target = $('.' + target);

      $target.bPopup({
        closeClass: 'popup-close',
        opacity: 0.8,
        follow: false
      });
    });



    // menu
    var $menuWrapper = $('.menu'),
        MENU_HEIGHT = $menuWrapper.height(),
        $menuLinks = $menuWrapper.find('.menu-scroll'),
        scrollTop = 0;

    function scrollToElement(target) {
      var targetPosition = $(target).offset().top - MENU_HEIGHT;

      $('body, html').animate({
        scrollTop: targetPosition
      }, {
        duration: 700
      });
    }

    $window.on('load scroll', function() {
      scrollTop = $window.scrollTop();

      if (scrollTop > 0) {
        $menuWrapper.addClass('is-scrolled');
      } else {
        $menuWrapper.removeClass('is-scrolled');
      }
    });

    $menuLinks.on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');
      scrollToElement(target);
    });


});
