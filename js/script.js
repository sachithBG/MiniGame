$(function() {

    var anim_id;

    //saving dom objects to variables

    var container = $("#di");
    var plane= $('#plane');
    var plane_1 = $('#plane1');
    var plane_2= $('#plane2');
    var plane_3 = $('#plane3');
    var root_1 = $('#root1');
    var root_2 = $('#root2');
    var root_3 = $('#root3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');
    var bac1 = $('#bacg1');
    var bac2 = $('#bacg2');
    var scorediv = $('#score_div');

    //saving some initial setup

    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var plane_width = parseInt(plane_1.width());
    var plane_height = parseInt(plane_1.height());

    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var root_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;
    var btn;
    var up1,dow1,le1,ri1;
    var a,b,c;

    $(".my_audio").trigger('load');
    $(".my_audio1").trigger('load');
    /* ------------------------------GAME CODE START------------------------------------------- */
    /* Move the planes */

    $("#right").click(function(){
        var dest = parseInt($("#plane").css("margin-left").replace("px", "")) + 100;
        if (dest > 500) {
            $("#plane").animate({
                marginLeft: "10px"
            }, 500 );
        }
        else {
            $("#plane").animate({
                marginLeft: dest + "px"
            }, 500 );
        }
    });

    $("#left").click(function(){
left();
    });

    // $("#up").click(function() {
    //     // btn = up1;
    // });
    // $("#down").on( "click", function () {
    //
    // });
    // $("#left").on( "click", function () {
    //     move_left = moveTo(30);
    //     move_left = false;
    //
    // });
    // $("#left").off( "click", function () {
    //     cancelAnimationFrame(move_left);
    //     move_left = false;
    // });
    // $("#right").click(function() {
    //     alert( "Handler for .click() called." );
    // });
    /*button plane */



    /*Key plane */

    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false ) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });




    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });
//////////////////////////////////////shoot/////////////////////////////
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 32) {
                shoot();
                play_audio_shoot('play');
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            $("#bulet").hide();
            var key = e.keyCode;
            if (key === 32) {
                play_audio_shoot('stop');
            }
        }
    });
    function bulet($div1,$div2) {
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var x1 = h1+y1;
        var x2 = h2+y2;
        var theImg = document.getElementById('bulet');
        theImg.height = x1-x2-40;
        $("#bulet").show();
        return;
    }
    function shoot() {
        if (collision1(plane, plane_1) ){
            bulet(plane,plane_1);
           plane_1.hide().val(a=1);
        }else if(collision1(plane, plane_2)){
            bulet(plane,plane_2);
           plane_2.hide().val(b=1);
        } else if( collision1(plane, plane_3)){
            bulet(plane,plane_3);
            plane_3.hide().val(c=1);
        }
        $("#bulet").show();
            return;

    }
          /////////////////////////////////////////////////////////////////move
    function left() {
        if (game_over === false && parseInt(plane.css('left')) > 0) {
            plane.css('left', parseInt(plane.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(plane.css('left')) < container_width - plane_width) {
            plane.css('left', parseInt(plane.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(plane.css('top')) > 0) {
            plane.css('top', parseInt(plane.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(plane.css('top')) < container_height - plane_height) {
            plane.css('top', parseInt(plane.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }
    function diveRight() {
            scorediv.css('left', parseInt(scorediv.css('left')) + 5);
    }
    function scDiv() {
        scorediv.css({
            position: 'relative',
            top: '-65%',
            left: '15%',
            backgroundColor: '#010072'
        });
    }
    function play_audio(task) {
            if(task == 'play'){
                $(".my_audio").trigger('play');
            }
            if(task == 'stop'){
                $(".my_audio").trigger('pause');
                $(".my_audio").prop("currentTime",0);
            }
        }
    function play_audio_shoot(task) {
        if(task == 'play'){
            $(".my_audio1").trigger('play');
        }
        if(task == 'stop'){
            $(".my_audio1").trigger('pause');
            $(".my_audio1").prop("currentTime",0);
        }
    }
    /* Move the planes and root */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(plane, plane_1) || collision(plane, plane_2) || collision(plane, plane_3)) {
            stop_the_game();
            play_audio('stop');
            return;
        }
        bac2.hide();
        score_counter++;
        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) {
            speed++;
            root_speed++;
        }

        plane_down1(plane_1);
        plane_down1(plane_2);
        plane_down1(plane_3);

        root_down(root_1);
        root_down(root_2);
        root_down(root_3);

        anim_id = requestAnimationFrame(repeat);
    }

    ////////////////////////////////////////////////////////////plane & root down
    var plane_current_top;
    function plane_down1(plane) {
        play_audio('play');
        plane_current_top = parseInt(plane.css('top'));
         if (a==1 || b==1 || c==1){
             if(a==1){plane.show().val(a=0)};
             if(b==1){plane.show().val(b=0)};
             if(c==1){plane.show().val(c=0)};
             plane_down(plane);
         }else if (plane_current_top > container_height) {
             plane_down(plane);
         }
        plane.css('top', plane_current_top + speed);
    }
    function plane_down(plane) {
            plane_current_top = -200;
        // var plane_width = parseInt(plane.height());
        var plane_left = parseInt(Math.random() * (container_width - plane_width));
            plane.css('left', plane_left);
            plane.show();
    }

    function root_down(root) {
        var root_current_top = parseInt(root.css('top'));
        var root_width = parseInt(root.width());
        if (root_current_top > container_height) {
            var root_left = parseInt(Math.random() * (container_width - root_width));
            root.css('left', root_left);
            root_current_top = -300;
        }
        root.css('top', root_current_top+ root_speed);
    }

    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        scDiv();
        bac1.hide();
        root_1.hide(),root_2.hide(),root_3.hide();
        bac2.show(),plane.hide(),plane_1.hide(),plane_2.hide(),plane_3.hide();
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }



    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    function collision1($div1, $div2) {
        var x1 = $div1.offset().left;
        var w1 = $div1.outerWidth(true);
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var w2 = $div2.outerWidth(true);
        var r2 = x2 + w2;
        var w3= w2/4;
        var w4= w1/4;

        if (r1 < x2 || x1 > r2) return false;
        return true;
    }
});
