var status = 'inactive';
var counts = parseInt($('#time').html()) * 60; //session time in minute convert to seconds
var stage = $('#stage').html(); //session or break stage
var time = $('#time').html(); //session setting time

function decreaseTime() {
    var num = parseInt($(this).siblings('span').html());
    if (status === 'inactive' && num > 1 && stage === 'session') {
        $(this).siblings('span').html(--num);
        if ($(this).parent().prop('className') === 'session') {
            $('#time').html($(this).siblings('span').html());
        }
        if ($(this).parent().prop('className') === stage) {
            counts = parseInt($(this).siblings('span').html()) * 60;
        }
    } else if (status === 'inactive' && num > 1 && stage === 'break') {
        if ($(this).parent().prop('className') === 'break') {
            $(this).siblings('span').html(--num);
            $('#time').html($(this).siblings('span').html());
        }
        if ($(this).parent().prop('className') === stage) {
            counts = parseInt($(this).siblings('span').html()) * 60;
        }
    }
}

function increaseTime() {
    var num = parseInt($(this).siblings('span').html());
    if (status === 'inactive' && stage === 'session') {
        $(this).siblings('span').html(++num);
        if ($(this).parent().prop('className') === 'session') {
            $('#time').html($(this).siblings('span').html());
        }
        if ($(this).parent().prop('className') === stage) {
            counts = parseInt($(this).siblings('span').html()) * 60;
        }
    } else if (status === 'inactive' && stage === 'break') {
        if ($(this).parent().prop('className') === 'break') {
            $(this).siblings('span').html(++num);
            $('#time').html($(this).siblings('span').html());
        }
        if ($(this).parent().prop('className') === stage) {
            counts = parseInt($(this).siblings('span').html()) * 60;
        }
    }
}


function timerCounts() {
    var hours, minutes, seconds;
    if (counts >= 0) {
        hours = Math.floor(counts / 3600);
        minutes = Math.floor(counts % 3600 / 60);
        seconds = counts % 3600 % 60;
        var hms = ((hours >= 10) ? hours : '0' + hours) + ' : ' + ((minutes >= 10) ? minutes : '0' + minutes) + ' : ' + ((seconds >= 10) ? seconds : '0' + seconds);
        $('#time').html(hms);
        counts -= 1;
        if (stage === 'session') {
            var time = parseInt($('#sessionId').html()) * 60;
            var proportion = (time - counts) / time * 290;
            $('.fill').css({
                'height': proportion + "px",
                'background-color': 'rgb(153,204,0)'
            });
        } else {
            var time = parseInt($('#breakId').html()) * 60;
            var proportion = (time - counts) / time * 290;
            $('.fill').css({
                'height': proportion + "px",
                'background-color': 'rgb(255,68,68)'
            });
        }
    } else if (counts === -1) {
        if (stage === 'session') {
            stage = 'break';
            $('#stage').html(stage);
            counts = parseInt($('#breakId').html()) * 60;
            timerCounts();
        } else {
            stage = 'session';
            $('#stage').html(stage);
            counts = parseInt($('#sessionId').html()) * 60;
            timerCounts();
        }
    }
    //countdown running or not  
}

var intervalId;

function doTimer() {
    if (status === 'inactive') {
        status = 'active';
        intervalId = setInterval(timerCounts, 1000);
    } else {
        status = 'inactive';
        clearInterval(intervalId);
    }
}

$(document).ready(function () {
    $('.timer').click(doTimer);
    $('.incr').click(increaseTime);
    $('.decr').click(decreaseTime);
});
