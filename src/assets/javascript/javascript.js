window.onload = function() {

    function addClass(element, className) {
        element.className += " " + className;
    }

    function removeClass(element, className) {
        // Capture any surrounding space characters to prevent repeated
        // additions and removals from leaving lots of spaces.
        var classNameRegEx = new RegExp("\\s*" + className + "\\s*");
        element.className = element.className.replace(classNameRegEx, " ");
    }

    function toggleClass(element, className) {
        if (!element || !className) {
            return;
        }

        if (element.className.indexOf(className) === -1) {
            addClass(element, className);
        } else {
            removeClass(element, className);
        }
    }


    // Get Instagram photos
    var token = '1241846.5a75dba.762408d8526b4652939cd2f53ffd50d6',
    num_photos = 8;
     
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
            console.log(data);
            for( x in data.data ){
                $('ul.insta').append('<li><figure class="roll"><a href="'+data.data[x].link+'"><img src="'+data.data[x].images.standard_resolution.url+'"><figcaption><ul><li><i class="fa fa-heart"></i> '+data.data[x].likes.count+'</li><li><i class="fa fa-comment"></i> '+data.data[x].comments.count+'</li></ul></figcaption></a></figure></li>');
            }
        },
        error: function(data){
            console.log(data);
        }
    });


    // Open Twitter/share in a Pop-Up
    var $popup = document.getElementsByClassName('popup')[0];
    if (!$popup) {
        return;
    }
    $popup.addEventListener('click', function(e) {
        e.preventDefault()
        var width = 575,
            height = 400,
            left = (document.documentElement.clientWidth - width) / 2,
            top = (document.documentElement.clientHeight - height) / 2,
            url = this.href,
            opts = 'status=1' +
            ',width=' + width +
            ',height=' + height +
            ',top=' + top +
            ',left=' + left;

        window.open(url, 'twitter', opts);

        return false;
    });
}
$(document).ready(function() {
  $(window).on('load scroll resize', function() {

    var docHeight = $(document).height();
    var windowPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var completion = windowPos / (docHeight - windowHeight);
    
    if (docHeight <= windowHeight) {
      $('#progress').width(windowWidth);
    } else {
      $('#progress').width(completion * windowWidth);
    }

  });
});