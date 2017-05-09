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
        scrollTop = 0,
        clickMenuFlag = false,
        $contentBlocks = $('.content-scroll'),
        contentBlocksTopPoints = [],
        collectContentBlocksTopPoints = function () {
          $contentBlocks.each(function(index, element) {
            contentBlocksTopPoints.push($(element).offset().top);
          });
        };

    function scrollToElement(target) {
      var targetPosition = $(target).offset().top - MENU_HEIGHT;

      clickMenuFlag = true;
      $('body, html').animate({
        scrollTop: targetPosition
      }, {
        duration: 700,
        complete: function() {
          clickMenuFlag = false;
        }
      });
    }

    function checkActiveContentBlocks(scrollTop) {
      var current;

      contentBlocksTopPoints.forEach(function(item, i, arr) {
        if (scrollTop > arr[i] && scrollTop < arr[i+1]) {
          current = i;
        }
      });
      $menuLinks.removeClass('is-active');
      $menuLinks.eq(current).addClass('is-active');
    }

    collectContentBlocksTopPoints();

    $window
      .on('load scroll', function() {
        scrollTop = $window.scrollTop();

        if (scrollTop > 0) {
          $menuWrapper.addClass('is-scrolled');
        } else {
          $menuWrapper.removeClass('is-scrolled');
        }

        if (!clickMenuFlag) {
          var scrollTopMenu = scrollTop + MENU_HEIGHT + 1;
          checkActiveContentBlocks(scrollTopMenu);
        }
      })
      .on('resize', function() {
        collectContentBlocksTopPoints();
      });

    $menuLinks.on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');

      $menuLinks.removeClass('is-active');
      $(this).addClass('is-active');
      scrollToElement(target);
    });
});
