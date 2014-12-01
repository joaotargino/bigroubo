/**
 * Created by JoãoPaulo on 11/18/2014.
 */

$("#left0-T").prop("onclick", false);

var frame = -1;

$(function() {
    var sound = new Howl({
        urls: ['audio/repente.wav'],
        autoplay: true,
        loop: true,
        volume: 1.0,
        onend: function() {
        }
    });

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    /* add gest.js controls */
    document.addEventListener('gest', function(gesture) {

        if (gesture.up){
            console.log("closing");

            parent.$.fancybox.close();
        }
        else if (gesture.left) {
            frame +=1;
            console.log("left " + frame);
            move("left", frame);


        } else if (gesture.right) {
            frame +=1;
            console.log("right " + frame)

            if(frame == 0  || frame == 5){
                move("left", frame)
            }
            else move("right", frame);

        } else if (gesture.down) {
            frame +=1;
            console.log("down " + frame);
            if(frame == 0  || frame == 5){
               move("left", frame)
            }
            else move("down", frame);
        }


    function move(direction, quadro){

        var effects = new Howl({
            urls: ['audio/sound'+quadro+'.wav'],
            autoplay: true,
            loop: false,
            volume: 1.0,
            onend: function() {
            }
        });

        //console.log($("#audio"));
            $("#"+direction + quadro).fancybox({
                openEffect	: 'elastic',
                closeEffect	: 'elastic',

                helpers : {
                    title : {
                        type : 'inside'
                    }
                }
            });
        if(quadro == 0){
            $("#" + direction + "-T" + quadro).attr("src", "img/cover-T.png");
        }
        else if (quadro == 5){
            $("#" + direction + "-T" + quadro).attr("src", "img/back-T.png");
        }
        else {
            $("#" + direction + "-T" + quadro).attr("src", "img/" + direction + quadro + "-T.png");

        }
        $("#"+direction+quadro).click();
        var y = $(window).scrollTop();  //your current y position on the page
        $(window).scrollTop(y+100);

    }
    }, false);

    gest.start();
    /* /add gest.js controls */
});
