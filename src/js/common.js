$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    /*************** check if browser supports svg ***************/
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



    /*************** popup opening ***************/
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



    
});
