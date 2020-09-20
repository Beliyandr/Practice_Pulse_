$(document).ready(function () {

  //Carousel -------------------------------
  $('.carousel__inner').slick({
    dots: false,
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/chevron-left-solid.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="img/slider/chevron-right-solid.png"></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        arrows: false
      }
    }]
  });

  //tabs ----------- 

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  // Не оптимизированный слайд Товара -----------
  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });

  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });

  //  оптимизированный слайд Товара -----------  
  function toggleSlide(item) {

    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');


  //////// Модальные окна

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  // $('.button_mini').on('click', function(){
  //   $('.overlay, #order').fadeIn('slow')
  // });
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });


  // Валидация Фром!!!!!!!!!!!!!!!

  // $('#consultation-form').validate();
  // $('#consultation form').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 2
  //     },
  //     phone: "required",
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages: {
  //     name: {
  //       required: "Пожалуйста введите свое имя",
  //       minlength: jQuery.validator.format("Введите {0} символа")
  //     },
  //     phone: "Пожалуйста введите свой номер телефона",
  //     email: {
  //       required: "Пожалуйста введите свою почту",
  //       email: "Неправильно введен адрес почты"
  //     }
  //   }
  // });
  // $('#order form').validate();

function validateForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа")
      },
      phone: "Пожалуйста введите свой номер телефона",
      email: {
        required: "Пожалуйста введите свою почту",
        email: "Неправильно введен адрес почты"
      }
    }
  });
}

validateForms('#order form');
validateForms('#consultation form');
validateForms('#consultation-form');


// Validate MASK FORM
$('input[name=phone]').mask("+3 (80) 999 99 99")



//Технология Ajax для отправки писем из формы 

$('form').submit(function(e) { // после того как происходит submit(отправка после валидации формы) 
  e.preventDefault();  // отключаем при отправке формы перезагрузку страницы
  $.ajax({
    type: "POST",
    url: "../mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");

      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');

  });
  return false;
});


//scroll    pageup    /////////////////////
//  smooth scroll and pageup

$(window).scroll(function() {
  if ($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a[href^='#']").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});





});