
// Наводим мышью на логотип, меняется картинка

$('.f-logo').on({
       "mouseover" : function() {
           this.src = 'images/img1200/LogoHover.png';
       },
       "mouseout" : function() {
           this.src='images/img1200/Logo@1X.png';
       }
});

//  Цвет кнопки при клике

$('.btn-left').click( function ()  {
    $('.btn-left').css('background-color', '#ebe9f9');
    $('.btn-right').css('background-color', 'transparent'); 
});

$('.btn-right').click( function () {
    $('.btn-left').css('background-color', 'transparent');
    $('.btn-right').css('background-color', '#ebe9f9');
});


// Карусель

jQuery.fn.swap = function(b) {
    b = jQuery(b)[0];
    var a = this[0],
    a2 = a.cloneNode(true),
    b2 = b.cloneNode(true),
    stack = this;
    a.parentNode.replaceChild(b2, a);
    b.parentNode.replaceChild(a2, b);
    stack[0] = a2;
    return this.pushStack(stack);
};


$('.btn-left').click(function () {
    $('.js-swap1').swap('.js-swap2');
});
        
$('.btn-right').click(function () {
    $('.js-swap2').swap('.js-swap1');
});

