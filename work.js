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
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}
loco()

if (window.matchMedia("(min-width: 1025px)").matches) {
    function menu() {
        var menu = document.querySelector('#openbtn');
        gsap.to(menu, {
            scale: 1,
            scrollTrigger: {
                trigger: '.hero',
                scroller: '.main',
                start: '10% top',
                toggleActions: 'play none none reverse',

            }
        })
    }
    menu()
}

if (window.matchMedia("(max-width: 950px)").matches) {
    function menu() {
        var menu = document.querySelector('#openbtn');
        gsap.to(menu, {
            scale: 1,
            scrollTrigger: {
                trigger: '.hero',
                scroller: '.main',
                start: 'top 10%',
                toggleActions: 'play none none reverse',

            }
        })
    }
    menu()
}

if (window.matchMedia("(min-width: 1025px)").matches) {
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

if (window.matchMedia("(min-width: 1025px)").matches) {
    function radius() {
        gsap.to('.radius', {
            y: '-125%',
            scrollTrigger: {
                trigger: '.contact',
                scroller: '.main',
                scrub: 2,
                start: 'top 55%',
                end: 'top 10%',
            }
        })
    }
    radius()
}

if (window.matchMedia("(min-width: 1025px)").matches) {
    function workbtn() {
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

function sidebar() {
    const tl = gsap.timeline({ paused: true });
  
    tl.to('.menu', {
      backgroundColor: '#334bd3',
      border: 'none'
    }, 'a');
  
    tl.to('.menu #closebtn', {
      scale: 1
    }, 'a');
  
    tl.to('.menu #openbtn', {
      scale: 0
    }, 'a');
  
    tl.to('#sidemenu', {
      x: '0', 
      borderRadius: '0',
      duration: 0.7
    }, 'a');
  
    tl.from('#sidemenu h2', {
      x: 500,
      stagger: .05, // Adjust stagger value if needed
      delay: .2
    }, 'a');
  
    document.querySelector('nav .right-nav2 p').addEventListener('click', function () {
      tl.play();
    });
  
    document.querySelector('.menu #openbtn').addEventListener('click', function () {
      tl.play();
    });
  
    document.querySelector('.menu #closebtn').addEventListener('click', function () {
      tl.reverse();
    });
  }
  
  sidebar();

  function graphics() {
    gsap.to('.graphics .row1', {
      x: -200,
      scrollTrigger: {
        trigger: '.graphics',
        scroller: '.main',
        start: 'top 50%',
        scrub: 2,
      }
    })
  
    gsap.to('.graphics .row2', {
      x: 200,
      scrollTrigger: {
        trigger: '.graphics',
        scroller: '.main',
        start: 'top 50%',
        scrub: 2,
      }
    })
  }
  graphics()