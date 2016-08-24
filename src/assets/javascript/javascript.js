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

    // Get Dribbble Shots
    $(function() {

        // Cache vars
        var $gallery = $('.shots');
        // Dribbble API shizzz
        var token = '0aa61b7b92b51893973673b0e824256f1971612714fabc47a9609bf4cc0dce70';
        var url = 'https://api.dribbble.com/v1/users/akashrine/shots?access_token=' + token;

        // Grab Dribbble popular
        $.getJSON(url, function(data) {

            $.each(data, function(index, shot) {
                if (index > 3) return false;
                var thumb = shot.images.teaser,
                    full = shot.images.hidpi || shot.images.normal,
                    html_url = shot.images.html_url;

                var item = $('<li class="item" data-full="' + full + '"><a href="' + html_url + '"><img src="' + full + '" /></a></li>');

                $gallery.append(item);

            });


        });

    });

    // Get Instagram photos
    var token = '1241846.5a75dba.762408d8526b4652939cd2f53ffd50d6',
    num_photos = 10;
 
$.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: token, count: num_photos},
    success: function(data){
        console.log(data);
        for( x in data.data ){
            $('ul.insta').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
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