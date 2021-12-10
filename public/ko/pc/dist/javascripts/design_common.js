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
    });

    _this.trigger("resize");
    $window.scroll(function () {
        winSc = _this.scrollTop();
    });
    main();
});
function main() {
   (() => {
      let yOffset = 0; // window.pageYOffset 대신 쓸 변수
      let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
      let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
      let enterNewScene = false; // 새로운 scene이 시작된 순간 true

      const sceneInfo = [
         {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
               container: document.querySelector('#scroll-section-0'),
               messageA: document.querySelector('#scroll-section-0 .main-message.a'),
               messageB: document.querySelector('#scroll-section-0 .main-message.b'),
               messageC: document.querySelector('#scroll-section-0 .main-message.c'),
               messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
               messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
               messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
               messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],
               messageA_translateY_out: [0, -20, {start: 0.25, end: 0.3}],
            }
         },
         {
            // 1
            type: 'normal',
            // heightNum: 5, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
               container: document.querySelector('#scroll-section-1'),
               content: document.querySelector('#scroll-section-1 .description')
            }
         },
         {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
               container: document.querySelector('#scroll-section-2'),
               messageA: document.querySelector('#scroll-section-2 .a'),
               messageB: document.querySelector('#scroll-section-2 .b'),
               messageC: document.querySelector('#scroll-section-2 .c'),
            },
            values: {
               messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
               messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
            }
         },
         {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
               container: document.querySelector('#scroll-section-3'),
            },
         }
      ];

      function setLayout() {
         // 각 스크롤 섹션의 높이 세팅
         for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === "sticky") {
               sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;

            } else if (sceneInfo[i].type === "normal") {
               sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
         }
         yOffset = window.pageYOffset;

         // 새로고침시 섹션 id 값에 현재 신 적용
         let totalScrollHeight = 0; // 토탈 스트롤 높이
         for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight; // 현재 스크롤 섹션의 높이를 토탈값에 넣음 0:4000 / 1:8000 / 2:12000
            if (totalScrollHeight >= yOffset) { // 토탈 스크롤 높이값이 현재 스크롤 값보다 클 때
               currentScene = i;
               break; // 반복문을 끝내고 벗어남
            }
         }
         // 현재 섹션 넘버값을 값을 바디 id 에 넣음
         document.body.setAttribute('id', `show-scene-${currentScene}`);
      }

      function calcValues(values, currentYOffset) {
         let rv;
         // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
         const scrollHeight = sceneInfo[currentScene].scrollHeight;
         const scrollRatio = currentYOffset / scrollHeight;

         if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
               rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
               rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
               rv = values[1];
            }
         } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
         }

         return rv;
      }

      function playAnimation() {
         const objs = sceneInfo[currentScene].objs;
         const values = sceneInfo[currentScene].values;
         const currentYOffset = yOffset - prevScrollHeight;
         const scrollHeight = sceneInfo[currentScene].scrollHeight;
         const scrollRatio = currentYOffset / scrollHeight;

         switch (currentScene) {
            case 0:
               const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
               const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
               const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
               const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
               objs.messageA.style.opacity = messageA_opacity_in;

               if ( scrollRatio <= 0.22 ) {
                  // in
                  objs.messageA.style.opacity = messageA_opacity_in;
                  objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;

               } else {
                  // out
                  objs.messageA.style.opacity = messageA_opacity_out;
                  objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
               }
               break;
            case 2:
               break;
            case 3:
               break;
         }
      }

      // 현재 스크롤 되는 신 넘버 값을 판별하여 섹션 id 에 값을 넣어주는 함수
      function scrollLoop() {
         enterNewScene = false; // 현재 들어온 신
         prevScrollHeight = 0; // 이전 섹션 높이를 더한 값

         for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
         }

         // 현재 스크롤 된 값이 (이전 높이값 보다 클 때)
         if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight ) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
         }
         // 현재 스크롤 된 값이 
         if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
         }

         // console.log("전 enterNewScene "+enterNewScene);
         if (enterNewScene) return;
         // console.log("후 enterNewScene "+enterNewScene);
          playAnimation();
      }

      window.addEventListener('scroll', () => {
         yOffset = window.pageYOffset;
         scrollLoop();
      });
      window.addEventListener('load', setLayout);


   })();
}
