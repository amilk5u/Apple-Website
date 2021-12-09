"use strict";
var winW;
var winH;
var $window = $(window);
var winSc = $(window).scrollTop();
var $html = $("html");

const $header = $("header"),
   $footer = $("footer"),
   $logo = $header.find(".logo");

window.addEventListener('DOMContentLoaded', function() {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
        // mobile view
        if (winW < 750) {
            $(".pc-content").remove();
        }
    });
    
    _this.trigger("resize");
    $window.scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    main();
});
function layout() {


/*   $(document).on("mousemove", function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
   });

   $(".link").on("mouseenter", function () {
      cursor.addClass("active");
      follower.addClass("active");
   });

   $(".link").on("mouseleave", function () {
      cursor.removeClass("active");
      follower.removeClass("active");
   });*/

   const $menuBtn = $("#menuBtn"),
      $menuWrap = $(".menu_wrap");
   const $subGnbWrap = $(".sub_gnb_wrap");
   const $dim = $(".dim");

   // 메뉴버튼 클릭시 toggle 메뉴 생성
   $menuBtn.on("click", function() {
      const _this = $(this);
      if ( _this.hasClass("active") ) {
         _this.removeClass("active");
         $subGnbWrap.removeClass("active");
         $dim.removeClass("active");
         TweenMax.to($dim, .5, { display:"none", opacity:0 })
      } else {
         _this.addClass("active");
         $subGnbWrap.addClass("active");
         TweenMax.to($dim, .5, { display:"block", opacity:.7 })
      }
   });

   $dim.on("click", function() {
      $subGnbWrap.removeClass("active");
      $menuBtn.removeClass("active");
      TweenMax.to($dim, .5, { display:"none", opacity:0 })
   });

   $window.scroll(function(){
      $(".top").text(winSc);
      // 스크롤을 100 내리면 active 하기
      if ( winSc > 120 ) {
         $(".header").addClass("active");
      } else {
         $(".header").removeClass("active");
      }
   });




}
function main() {

   /*var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값
   if (navigator.platform) if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      console.log("mobile 접속")
      $(".pc-content").remove();
   } else {
      console.log("desktop 접속")
      $(".mo-content").remove();
   }*/


   // 전체 모션
   function fadeMotion ()  {
      let $motionCont = $(".motion-cont");
      let _contTopArray = [];
      let playMotion = winH / 10 * 7;

      $motionCont.each(function(i){
         let contH = Math.ceil(($motionCont.eq(i).offset().top) - playMotion);
         _contTopArray.push(contH);
      });

      for ( var i = 0; i < $motionCont.length; i++ ) {
         // 윈도우 스크린이 컨텐츠보다 클때
         if ( winSc >= _contTopArray[i] ) {
            // 컨텐츠 에 on 클래스가 없을 때 실행해라
            if ($motionCont.eq(i).hasClass("on") === false) {
               $motionCont.eq(i).addClass("on");
               TweenMax.to($motionCont.eq(i), 1.75, {transform:"translate(0,0)", opacity:1});
            }
         }
      }
   }

   $window.scroll(function () {
      fadeMotion();
   });

   function blackTheme() {
      $header.addClass("black_on");
   }

   function intro () {
      $footer.css("display","none");

      const $imgLi1 = $(".img_wrap").find("li:nth-of-type(1)"),
         $imgLi2 = $(".img_wrap").find("li:nth-of-type(2)"),
         $imgLi3 = $(".img_wrap").find("li:nth-of-type(3)"),
         $imgLi4 = $(".img_wrap").find("li:nth-of-type(4)"),
         $imgLi5 = $(".img_wrap").find("li:nth-of-type(5)");

      const $txtLi1 = $(".txt_wrap").find("li:nth-of-type(1)"),
         $txtLi2 = $(".txt_wrap").find("li:nth-of-type(2)"),
         $txtLi3 = $(".txt_wrap").find("li:nth-of-type(3)"),
         $txtLi4 = $(".txt_wrap").find("li:nth-of-type(4)"),
         $txtLi5 = $(".txt_wrap").find("li:nth-of-type(5)");

      var imgMotion = new TimelineMax({repeat: -1});
      imgMotion.to($imgLi1, 4, {transform: "scale(1)", delay: -1})
      imgMotion.to($txtLi1, .1, {opacity: 0, delay: -1.3})
      imgMotion.to($imgLi1, .2, {opacity: 0})

      imgMotion.to($imgLi2, .2, {opacity: 1, delay: -1.5})
      imgMotion.to($txtLi2, .1, {opacity: 1, delay: -1.5})
      imgMotion.to($imgLi2, 4, {transform: "translate(0,0)  scale(1.07)", delay: -1.5});
      imgMotion.to($txtLi2, .1, {opacity: 0, delay: -1.3})
      imgMotion.to($imgLi2, .2, {opacity: 0})

      imgMotion.to($imgLi3, .2, {opacity: 1, delay: -1.5})
      imgMotion.to($txtLi3, .1, {opacity: 1, delay: -1.5})
      imgMotion.to($imgLi3, 4, {transform: "translate(0,0)", delay: -1.5});
      imgMotion.to($txtLi3, .1, {opacity: 0, delay: -1.3})
      imgMotion.to($imgLi3, .2, {opacity: 0})


      imgMotion.to($imgLi4, .2, {opacity: 1, delay: -1.5})
      imgMotion.to($txtLi4, .1, {opacity: 1, delay: -1.5})
      imgMotion.to($imgLi4, 4, {transform: "translate(0,0)  scale(1.07)", delay: -1.5});
      imgMotion.to($txtLi4, .1, {opacity: 0, delay: -1.3})
      imgMotion.to($imgLi4, .2, {opacity: 0})

      imgMotion.to($imgLi5, .2, {opacity: 1, delay: -1.5})
      imgMotion.to($txtLi5, .1, {opacity: 1, delay: -1.5})
      imgMotion.to($imgLi5, 4, {transform: "translate(0,0) scale(1)", delay: -1.5});

      var cursor = $(".cursor"),
         follower = $(".cursor-follower");
      var posX = 0,
         posY = 0;
      var mouseX = 0,
         mouseY = 0;

      TweenMax.to({}, 0.016, {
         repeat: -1,
         onRepeat: function () {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
               css: {
                  left: posX - 12,
                  top: posY - 12
               }
            });
            TweenMax.set(cursor, {
               css: {
                  left: mouseX,
                  top: mouseY
               }
            });
         }
      });

      var main_slide = new Swiper(".main_slide", {
         slidesPerView: 1,
         effect : 'fade', // 페이드 효과 사용
         loop : true, // 무한 반복
         autoplay: {
            delay: 1250,
            disableOnInteraction:false,
         },
         speed:1100,
         pagination: {
            el: ".swiper-pagination",
            clickable: true,
         },
      });
   }

   function init() {
      fadeMotion();
      if ($(".container").hasClass("intro")) {intro();}
      if ($(".container").hasClass("black-theme")) {blackTheme();}
   }
   init();
}
