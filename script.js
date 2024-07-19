function loco() {
  gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  // follwoing line is not required to work pinning on touch screen

  /* pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed"*/
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}
loco()

if (window.matchMedia("(min-width: 1025px)").matches) {
  function menu() { 
    var menu = document.querySelector('.menu');
    gsap.to(menu,{
      opacity: 1,
      scrollTrigger:{
        trigger: '.hero',
        scroller: '.main',
        start: '30% top',
        scrub: 1,

      }
    })
    }
    menu()
}

if (window.matchMedia("(max-width: 950px)").matches) {
  function menu() { 
    var menu = document.querySelector('.menu');
    gsap.to(menu,{
      opacity: 1,
      scrollTrigger:{
        trigger: '.hero',
        scroller: '.main',
        start: 'bottom bottom',
        scrub: 1,

      }
    })
    }
    menu()
}

if (window.matchMedia("(min-width: 1025px)").matches){
  function rightelem() {
    var rightelem = document.querySelectorAll('.right-elem');
  
    rightelem.forEach(function (elem) {
        var img = elem.querySelector('img');
        var h2 = elem.querySelector('h2');
  
        elem.addEventListener('mouseenter', function () {
            gsap.to(img, {
                scale: 4
            });
        });
  
        elem.addEventListener('mouseenter', function () {
          gsap.to(h2, {
              x: -20,
              opacity: '.3'
          });
      });
  
        elem.addEventListener('mouseleave', function () {
            gsap.to(img, {
                scale: 0
            });
        });
  
        elem.addEventListener('mouseleave', function () {
          gsap.to(h2, {
              x: 20,
              opacity: '1'
          });
      });
  
        elem.addEventListener("mousemove", function (event) {
            var boundingRect = elem.getBoundingClientRect();
            var offsetX = event.clientX - boundingRect.left;
            var offsetY = event.clientY - boundingRect.top;
  
            gsap.to(img, {
              x: offsetX + 150,
              y: offsetY - (img.offsetHeight / 2),
                ease: "power2.out"
            });
        });
    });
  }
  rightelem();
}

if (window.matchMedia("(min-width: 1025px)").matches){
  function radius(){
    gsap.to('.radius',{
      y: '-100%',
      scrollTrigger:{
          trigger: '.contact',
          scroller: '.main',
          scrub: 2,
          start: 'top 55%',
          end: 'top 0%',
      }
  })
  }
  radius()
}

if (window.matchMedia("(min-width: 1025px)").matches){
  function workbtn(){
    gsap.from('.work .btn', {
      x: -500,
      scrollTrigger: {
          trigger: '.contact',
          scroller: '.main',
          scrub: 2,
          start: 'top 45%',
          end: 'top 10%'
      }
  })
  }
  workbtn()
}

if (window.matchMedia("(min-width: 1025px)").matches){
  function textfill(){
    gsap.to('.part1-left-fill',{
      width: '100%',
      scrollTrigger: {
        trigger: '.part-1',
        scroller: '.main',
        start: 'top 50%',
        end: 'top top',
        scrub: 3,
      }
    })
  }
  textfill()
}


const loadercontainer = document.querySelector('.loader')


window.addEventListener('load',function(){
  gsap.to(loadercontainer,{
    opacity: 0,
    display: 'none',
    delay:2,
    duration: 1,
  })
})