gsap.registerPlugin(ScrollTrigger);

// ENABLE SMOOTH SCROLLING
smoothScroll("#content");

function smoothScroll(content, viewport, smoothness) {
  content = gsap.utils.toArray(content)[0];
  smoothness = 1.5;

  gsap.set(viewport || content.parentNode, {
    overflow: "hidden",
    position: "fixed",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  gsap.set(content, { overflow: "visible", width: "100%" });

  let getProp = gsap.getProperty(content),
    setProp = gsap.quickSetter(content, "y", "px"),
    setScroll = ScrollTrigger.getScrollFunc(window),
    removeScroll = () => (content.style.overflow = "visible"),
    killScrub = (trigger) => {
      let scrub = trigger.getTween
        ? trigger.getTween()
        : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
      scrub && scrub.kill();
      trigger.animation.progress(trigger.progress);
    },
    height,
    isProxyScrolling;

  function refreshHeight() {
    height = content.clientHeight;
    content.style.overflow = "visible";
    document.body.style.height = height + "px";
    return height - document.documentElement.clientHeight;
  }

  ScrollTrigger.addEventListener("refresh", () => {
    removeScroll();
    requestAnimationFrame(removeScroll);
  });
  ScrollTrigger.defaults({ scroller: content });
  ScrollTrigger.prototype.update = (p) => p; 

  ScrollTrigger.scrollerProxy(content, {
    scrollTop(value) {
      if (arguments.length) {
        isProxyScrolling = true; 
        setProp(-value);
        setScroll(value);
        return;
      }
      return -getProp("y");
    },
    scrollHeight: () => document.body.scrollHeight,
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  return ScrollTrigger.create({
    animation: gsap.fromTo(
      content,
      { y: 0 },
      {
        y: () => document.documentElement.clientHeight - height,
        ease: "none",
        onUpdate: ScrollTrigger.update,
      }
    ),
    scroller: window,
    invalidateOnRefresh: true,
    start: 0,
    end: refreshHeight,
    refreshPriority: -999,
    scrub: smoothness,
    onUpdate: (self) => {
      if (isProxyScrolling) {
        killScrub(self);
        isProxyScrolling = false;
      }
    },
    onRefresh: killScrub,
  });
}

// ANIMATE START SCREEN
// let tl = gsap.timeline({
//     scrollTrigger: {
//       scrub: true,
//       trigger: ".slide1",
//       end: "20% top",
//       pin: true,
//       markers: true,
//     },
//     ease: "SloMo.easeOut",
// });
// tl.to(".moveUp",{y: '0%', duration: 0.5})
//   .to("#scrolltxt1", { y: '0%', duration: 0.7, stagger: 0.2 })
// .to("#scrolltxt2", {y: '0%', duration: 0.7, stagger: 0.2});

let intro = gsap.timeline({ ease: "SloMo.easeOut" });
intro.to("#introtxt1", {y: '0%', duration: 0.5});
intro
  .to("#introtxt2", { y: "0%", duration: 0.5, delay: -0.2 })
  .to("#scrolltxt1", { y: "0%", duration: 0.5, delay: -0.2 })
  .to("#scrolltxt2", { y: "0%", duration: 0.5, delay: -0.2 });


// SECTION OF WORDS SCROLLING HORIZONTALLY
gsap.set(".wrapper", { xPercent: -50, yPercent: -50 });
no01 = document.querySelectorAll("#no1 .box");
no02 = document.querySelectorAll("#no2 .box");
no03 = document.querySelectorAll("#no3 .box");
no04 = document.querySelectorAll("#no4 .box");
const boxWidth = 515 + 30;
const boxWidth2 = 469 + 50;
const boxWidth3 = 1383 + 50;
const boxWidth4 = 1341 + 50;
totalWidth = boxWidth * 6; //  * n of boxes
totalWidth2 = boxWidth2 * 6; //  * n of boxes
totalWidth3 = boxWidth3 * 4;
totalWidth4 = boxWidth4 * 4;
dirFromLeft = "+=" + totalWidth;
dirFromRight = "-=" + totalWidth2;
dirFromRight1 = "-=" + totalWidth3;
dirFromRight2 = "-=" + totalWidth3;
var mod = gsap.utils.wrap(0, totalWidth);
var mod2 = gsap.utils.wrap(0, totalWidth2);
var mod3 = gsap.utils.wrap(0, totalWidth3);
var mod4 = gsap.utils.wrap(0, totalWidth4);

// console.log(no01.item(0).offsetWidth);
// console.log(no02.item(0).offsetWidth);
// console.log(no03.item(0).offsetWidth);
// console.log(no04.item(0).offsetWidth);

gsap.set(no01, {
  x: function (i) {
    return i * boxWidth;
  },
});
gsap.to(no01, {
  scrollTrigger: {
    trigger: ".pinElem",
    toggleActions: "resume pause resume pause",
    // markers: true,
    endTrigger: ".showcaseThree",
    end: "bottom top",
    pin: true,
  },
  x: dirFromLeft,
  modifiers: {
    x: (x) => mod(parseFloat(x)) + "px",
  },
  duration: 30,
  ease: "none",
  repeat: -1,
});

gsap.set(no02, {
  x: function (i) {
    return i * boxWidth2;
  },
});
gsap.to(no02, {
  scrollTrigger: {
    trigger: ".pinElem",
    endTrigger: ".showcaseThree",
    end: "bottom top",
    toggleActions: "resume pause resume pause",
    // markers: true,
    pin: true,
  },
  x: dirFromRight,
  modifiers: {
    x: (x) => mod2(parseFloat(x)) + "px",
  },
  duration: 30,
  ease: "none",
  repeat: -1,
});

gsap.set(no03, {
  x: function (i) {
    return i * boxWidth3;
  },
});
gsap.to(no03, {
  scrollTrigger: {
    trigger: ".pinElem",
    endTrigger: ".showcaseThree",
    toggleActions: "resume pause resume pause",
    end: "bottom top",
    // markers: true,
    pin: true,
  },
  x: dirFromRight1,
  modifiers: {
    x: (x) => mod3(parseFloat(x)) + "px",
  },
  duration: 55,
  ease: "none",
  repeat: -1,
});
gsap.set(no04, {
  x: function (i) {
    return i * boxWidth4;
  },
});
gsap.to(no04, {
  scrollTrigger: {
    trigger: ".pinElem",
    endTrigger: ".showcaseThree",
    end: "bottom top",
    toggleActions: "resume pause resume pause",
    // markers: true,
    pin: true,
  },
  x: dirFromRight2,
  modifiers: {
    x: (x) => mod4(parseFloat(x)) + "px",
  },
  duration: 55,
  ease: "none",
  repeat: -1,
});

// gsap.to(".pinElem", {
//   scrollTrigger: {
//     trigger: ".pinElem",
//     endTrigger: ".showcaseHelper",
//     pin: true,
//     end: "bottom top",
//     // markers: true,
//   },
// });

//animateFonts upwards one
gsap.to(".boxes", {
  scrollTrigger: {
    trigger: ".showcaseOne",
    start: "bottom 70%",
    endTrigger: ".showcaseTwo",
    scrub: true,
    end: "top 70%",
    // markers: true
  },
  y: -147,
});

//animateFonts upwards two
gsap.to(".boxes", {
  scrollTrigger: {
    trigger: ".showcaseTwo",
    start: "bottom 70%",
    endTrigger: ".showcaseThree",
    scrub: true,
    end: "top 70%",
    // markers: true,
    immediateRender: false,
  },
  y: -294,
});

gsap.to(".pinCircle", {
  scrollTrigger: {
    scrub: true,
    trigger: ".slide2",
    start: "35% center",
    end: "40% 30%",
    pin: true,
    // end: "=+1000",
    // markers: true,
  },
  rotation: -360,
  onEnter: myFunction()
});


// // Get the id of the <path> element and the length of <path>
// var triangle = document.getElementById("triangle");
// var length = triangle.getTotalLength();

// // The start position of the drawing
// triangle.style.strokeDasharray = length;

// // Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
// triangle.style.strokeDashoffset = length;

// // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled

// function myFunction() {
//   var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop-1080) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

//   var draw = length * -scrollpercent*6;

//   // Reverse the drawing (when scrolling upwards)
//   triangle.style.strokeDashoffset = length - draw;
// }

