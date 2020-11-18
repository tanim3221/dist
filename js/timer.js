$(function() {
    $(document).on('click', '.edit_time_picker', function(e) {
        e.preventDefault();
        $('#timer_up').modal('show');
    });
    $('#datetimepicker1').datetimepicker({
        sideBySide: true,
        format: 'YYYY-MM-DD HH:mm:ss'
    })
});
// Set the date we're counting down to
var countDownDate = new Date(customDate).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = ('0' + Math.floor(distance / (1000 * 60 * 60 * 24))).slice(-2);
    var hours = ('0' + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
    var minutes = ('0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    var seconds = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

    // Output the result in an element with id="demo"
    //document.getElementById("demo").innerHTML = days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";
    $('.timer_days').html(days);
    $('.timer_hours').html(hours);
    $('.timer_minutes').html(minutes);
    $('.timer_seconds').html(seconds);

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);

        $('#great_deals_body_wrap').css({
            'display': 'none'
        });

        $('.timer_great_deals').html('No offers');
        $('.offer_name_great').hide();

        //$('#great_deals_body_wrap').html(now);
    }
}, 1000);