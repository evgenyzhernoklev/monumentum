$(document).ready(function() {
    var $window = $(window),
        $body = $('body'),
        scrollTop = 0;

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



    // sidebar scroll
    $('.sidebar-wrapper').each(function(index, element) {
      var $sidebarWrapper = $(element),
          sidebarWrapperHeight = $sidebarWrapper.height(),
          $sidebar = $sidebarWrapper.find('.sidebar-scroll'),
          sidebarHeight = $sidebar.innerHeight(),
          sidebarStartPosition = $sidebar.offset().top,
          sidebarLeftPosition = $sidebar.offset().left,
          sidebarStopPosition = $sidebarWrapper.offset().top + sidebarWrapperHeight - sidebarHeight;

      $window.on('load scroll', function() {
        scrollTop = $window.scrollTop();

        if (scrollTop > sidebarStartPosition) {
          if (scrollTop < sidebarStopPosition) {
            $sidebar.addClass('is-fixed').css({
              'left': sidebarLeftPosition,
              'top': '0'
            });
          } else {
            $sidebar.removeClass('is-fixed');
            $sidebar.css({
              'top': sidebarWrapperHeight - sidebarHeight,
              'left': '0'
            });
          }
        } else {
          $sidebar.removeClass('is-fixed').css('left', '0');
        }
      });
    });



    // menu
    var $menuWrapper = $('.menu'),
        MENU_HEIGHT = $menuWrapper.height(),
        $menuLinks = $menuWrapper.find('.menu-scroll'),
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



    // map
    ymaps.ready(init);
    var myMap;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        });

        var coords = [
                [55.75, 37.50],
                [55.75, 37.71],
                [55.70, 37.70],
                [55.732312, 37.691039]
            ],
            myCollection = new ymaps.GeoObjectCollection();

        for (var i = 0; i < coords.length; i++) {
            myCollection.add(
              new ymaps.Placemark(coords[i], {}, {
                iconLayout: 'default#image',
                iconImageHref: '/img/placemark.svg',
                conImageSize: [40, 40]
              })
            );
        }

        myMap.geoObjects.add(myCollection);
    }
});
