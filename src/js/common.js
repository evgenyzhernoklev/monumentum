$(document).ready(function() {
    var $window = $(window),
        $body = $('body'),
        scrollTop = 0;

    // check if browser supports svg
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



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
        $menuWrapperMobile = $menuWrapper.find('.menu-wrapper-mobile'),
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
        } else if (scrollTop > arr[arr.length - 1]) {
          current = arr.length - 1;
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

      $menuWrapperMobile.removeClass('is-active');
      $body.removeClass('mobile-overflow');
      $menuLinks.removeClass('is-active');
      $(this).addClass('is-active');
      scrollToElement(target);
    });



    // mobile menu
    $('.menu-open').on('click', function(e) {
      e.preventDefault();
      $body.addClass('mobile-overflow');
      $menuWrapperMobile.addClass('is-active');
    });

    $('.menu-close').on('click', function(e) {
      e.preventDefault();
      $body.removeClass('mobile-overflow');
      $menuWrapperMobile.removeClass('is-active');
    });



    // map
    ymaps.ready(init);
    var myMap;

    function init(){
        myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl']
        });

        myMap.behaviors.disable('scrollZoom');

        var coords = [
              [55.991893,37.214382], [55.818508, 37.644189], [55.906532, 37.590937], [55.639141, 37.258471],
              [55.863444, 37.704466], [55.804223, 37.710647], [55.634166, 37.734506], [55.883600, 37.494548],
              [55.528821, 37.561362], [55.768461, 37.553621], [55.765741, 37.707808], [55.723622, 37.798502],
              [55.845936, 37.591360], [55.661333, 37.442976], [55.839042, 37.501654], [55.830407, 37.812228],
              [55.705113, 37.612173], [55.711087, 37.597675], [55.496939, 37.584829], [55.985963, 37.260910],
              [55.750976, 37.836007], [55.800782, 37.770331], [55.733371, 37.689150], [55.627870, 37.797262],
              [55.570467, 37.582035], [55.622436, 37.635350], [55.595542, 37.628379], [55.705742, 37.797595],
              [55.713131, 37.411131], [55.844157, 37.646426], [55.911996, 37.564159], [55.681021, 37.781829],
              [55.865293, 37.638126], [55.865152, 37.343442], [55.793035, 37.599570], [55.753564, 37.621085],
              [55.725057, 37.557996], [55.609990, 37.698008], [55.871961, 38.152519], [55.815104, 37.615048],
              [56.007127, 37.389220], [55.886953, 37.688422], [55.731967, 37.839187], [55.610748, 37.623681],
              [55.792022, 37.719720], [55.799907, 37.639383], [55.873097, 37.661626], [55.538371, 37.387936],
              [55.754856, 37.856354], [55.319295, 36.508988], [55.773150, 37.348311], [55.427147, 36.961003],
              [55.926136, 37.558095], [55.815769, 37.562394], [55.699254, 37.408193], [55.793176, 37.400998],
              [55.915230, 37.378315], [55.599766, 37.425968], [55.800246, 37.734344], [55.537368, 37.525486],
              [55.505933, 37.620647], [55.952248, 37.215558], [55.602052, 37.547971]
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



    // popups with sliders
    $body.on('click', '.popup-open', function(e) {
      e.preventDefault();
      var target = $(this).data('popup'),
          $target = $('.' + target),
          $sliderTop = $target.find('.sliderTop'),
          $sliderBottom = $target.find('.sliderBottom');

      $target.bPopup({
        closeClass: 'popup-close',
        follow: false,
        opacity: 1,
        onOpen: function() {
          $body.addClass('is-overflow');

          setTimeout( function() {
            $sliderTop.slick({
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              asNavFor: '.' + target + ' .sliderBottom'
            });

            $sliderBottom.slick({
              infinite: true,
              arrows: false,
              slidesToShow: 4,
              slidesToScroll: 1,
              asNavFor: '.' + target + ' .sliderTop',
              focusOnSelect: true
            });
          }, 0);
        },
        onClose: function() {
          $body.removeClass('is-overflow');
          $sliderTop.slick('unslick');
          $sliderBottom.slick('unslick');
        }
      });
    });
});
