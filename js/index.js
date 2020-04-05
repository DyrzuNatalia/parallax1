
let phoneToggle = () => {
  let buttonOpenPhone = $('.phone-open');
  let phoneList = $('.phone__list');
  let selectedPhone = $('.phone__selected');
  let phoneWrap = $('.phone__number');

  $(buttonOpenPhone).click(function () {
    phoneList.slideToggle(300);
  });

  $('.phone__list a').on("click", function () {
    let phoneCurrent = $(this).html();
    let selectedClass = $(this).parent('li').attr('class');

    phoneList.hide();
    phoneWrap.removeClass().addClass('phone__number ' + selectedClass);
    selectedPhone.html(phoneCurrent);
  });

}


let parallaxIt = () => {

  let $window = $(window);  
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;  // для IE 

  $window.on('scroll resize', function () {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  });

  $('[data-type="background"]').each(function () {

    let $backgroundObj = $(this);
    let pos;
    let coords;
    let speed = ($backgroundObj.data('speed') || 0);



    $window.on('scroll resize', function () {

      let bgOffset = parseInt($backgroundObj.offset().top);  // координаты по у - позиц. relative

      if ($backgroundObj.attr('data-vector') == 'horizontal') {
        pos = (scrollTop - bgOffset) / speed;
        coords = pos + 'px ' + '50%';
        $backgroundObj.css({ backgroundPosition: "calc(50% " + "- " + pos + "px)" });
      } else{
        pos = -((scrollTop - bgOffset) / speed);
        coords = '50% ' + pos + 'px';
        $backgroundObj.css({ backgroundPosition: coords });
      }

    });

  });

  $window.trigger('scroll');
}


let applyEffect = (el, x, y) => {
  el.css({
    "transform": "translate(" + x + "px, " + -y + "px)",  // получили новые координаты
    "-webkit-transform": "translate(" + x + "px, " + -y + "px)",
    "-moz-transform": "translate(" + x + "px, " + -y + "px)"
  });
};


let toTopPlane = () => {

    if ($(this).scrollTop() > 100) {
      $('.up').fadeIn();
    } else {
      $('.up').fadeOut();
    }
  
  
}





$(document).ready(function () {

  phoneToggle();
 
  $(window).scroll( toTopPlane() );

  $('.up').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });


  //mobile menu


  $('.btn-burger').on('click', function () {

    $('.burger-menu__list').slideToggle(300, function () {

      $('<div class="overlay"></div>').prependTo($('body'));
      $('body').addClass('hidden')

      if ($(this).css('display') === 'none') {
       $('.overlay').remove();
        $(this).removeAttr('style');
        $('body').removeAttr('class');
        
      }
      
      $(".submenu").hide();
      return false;
    });

  });

 // $(".nav-bar__item a").click(function () {

  //  $('.nav-bar__list').slideToggle(300);

  //});



/*
  $(".btn-burger").click(function () {

    $(".burger-menu__list").toggle("slide", { direction: "right" }, function () {

      if ($(this).css("display") === "none") {
        $(this).removeAttr("style");
      };

      return false;

    });
  });
*/
  $(".open-burger-submenu").click(function () {
    $(".burger-submenu").slideToggle(300);
    return false;
  })



  $(window).resize(function () {
    if ($(window).width() >= 768) {
      $('.burger-menu__list').removeAttr("style");
    };
  });





  $(".banner-carusel").slick({
    dots: false,
    infinite: true,
    autoplay: true,
    adaptiveHeight: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    arrows: true,
    prevArrow: '<div class="prev"></div>',
    nextArrow: '<div class="next"></div>',

    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        }
      }
    ]


  });

  $('.reviews-slider').slick({
    slidesToScroll: 1,
   // autoplay: true,
    fade: false,
    arrows: true,
    dots: false,
    variableWidth: true,
    centerMode: true,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          arrows: false,
        }
      },
      
    ]

  });



  $('.parallax-wrap').on("mousemove", function (e) { 

  let itemWidth = $(this).innerWidth(); 
  let itemHeight = $(this).innerHeight();  
  let x = e.pageX - $(this).position().left; // координаты по х относит родительского
  let y = e.pageY - $(this).position().top;  // координаты по у

    let ax = (-(itemWidth / 2 - x) / 30).toFixed(5);  // новые координаты, округл
    let ay = ((itemHeight / 2 - y) / 40).toFixed(5);

    applyEffect($(this).find('.cloud-layer'), -ax, -ay);
    $('.cloud-layer').css({ "transition": "none" });

  }).on("mouseleave", function (e) {
    applyEffect($(this).find('.cloud-layer'), 0, 0);  
    $('.cloud-layer').css({ "transition": "transform, 0.2s" });

  });

  $('.tours-wrap').slick({
    arrows: false,
    infinite: true,
  //  autoplay: true,
    slidesToScroll: 1,
    centerMode: true,
    mobileFirst: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 992,
      settings: 'unslick'
    }]
  });

  $('.news-slider').slick({
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToScroll: 1,
    centerMode: true,
    mobileFirst: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 992,
      settings: 'unslick'
    }]
  });



  parallaxIt();

})