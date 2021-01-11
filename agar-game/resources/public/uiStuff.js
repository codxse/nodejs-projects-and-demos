var wHeight = $(window).height();
var wWidth = $(window).width();
var player = {} //This is all things "this" player

var canvas = document.querySelector('#the-canvas');
var context = canvas.getContext('2d');
canvas.width = wWidth;
canvas.height = wHeight;

$(window).load(()=>{
    $('#loginModal').modal('show')
})

$('.name-form').submit(function (event) {
    event.preventDefault()
    // console.log("Submitted!")
    player.name = document.querySelector('#name-input').value;
    $('#loginModal').modal('hide');
    $('#spawnModal').modal('show')
    document.querySelector('.player-name').innerHTML = player.name
})

$('.start-game').click(function (event) {
    $('.modal').modal('hide');
    $('.hiddenOnStart').removeAttr('hidden');
    init();
})