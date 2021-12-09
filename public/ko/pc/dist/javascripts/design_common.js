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
               canvas: document.querySelector('#video-canvas-0'),
               context: document.querySelector('#video-canvas-0').getContext('2d'),
               videoImages: []
            },
            values: {
               videoImageCount: 300,
               imageSequence: [0, 299],
               canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
               messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
               messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
               messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
               messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
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
            if (sceneInfo[i].type === 'sticky') {
               sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal')  {
               sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
         }
         yOffset = window.pageYOffset;

         let totalScrollHeight = 0;
         for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
               currentScene = i;
               break;
            }
         }
         document.body.setAttribute('id', `show-scene-${currentScene}`);

         const heightRatio = window.innerHeight / 1080;
         sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
         sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
               // console.log('0 play');
               // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
               // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
               objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);
               break;
            case 2:
               break;

            case 3:
               break;
         }
      }

      function scrollLoop() {
         enterNewScene = false;
         prevScrollHeight = 0;

         for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
         }

         if (enterNewScene) return;
         playAnimation();
      }

      window.addEventListener('load', () => {
         let tempYOffset = yOffset;
         let tempScrollCount = 0;
         if (tempYOffset > 0) {
            let siId = setInterval(() => {
               scrollTo(0, tempYOffset);
               tempYOffset += 5;

               if (tempScrollCount > 20) {
                  clearInterval(siId);
               }
               tempScrollCount++;
            }, 20);
         }
         window.addEventListener('scroll', scrollLoop);
         window.addEventListener('resize', setLayout);
      });
   })();
}
