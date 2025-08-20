// Optimized animation script with improvements
class WebsiteAnimations {
  constructor() {
    this.locoScroll = null;
    this.breakpoints = {
      desktop: 1025,
      tablet: 950
    };
    
    this.init();
  }

  // Initialize all animations
  init() {
    this.initLocoScroll();
    this.initResponsiveAnimations();
    this.initScrollAnimations();
    this.initLoadingAnimation();
    this.initSidebar();
  }

  // Initialize Locomotive Scroll with ScrollTrigger
  initLocoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    this.locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
      tablet: { smooth: true },
      smartphone: { smooth: true }
    });

    // Sync ScrollTrigger with Locomotive Scroll
    this.locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop: (value) => {
        return arguments.length
          ? this.locoScroll.scrollTo(value, 0, 0)
          : this.locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      })
    });

    ScrollTrigger.addEventListener("refresh", () => this.locoScroll.update());
    ScrollTrigger.refresh();
  }

  // Check if screen matches breakpoint
  matchesBreakpoint(minWidth) {
    return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
  }

  // Initialize responsive animations
  initResponsiveAnimations() {
    this.initMenuAnimation();
    
    if (this.matchesBreakpoint(this.breakpoints.desktop)) {
      this.initRightElementHover();
      this.initRadiusAnimation();
      this.initWorkButtonAnimation();
    }
  }

  // Menu animation with responsive behavior
  initMenuAnimation() {
    const menu = document.querySelector('#openbtn');
    if (!menu) return;

    const isDesktop = this.matchesBreakpoint(this.breakpoints.desktop);
    const startTrigger = isDesktop ? '10% top' : 'bottom 90%';

    gsap.to(menu, {
      scale: 1,
      scrollTrigger: {
        trigger: '.hero',
        scroller: '.main',
        start: startTrigger,
        toggleActions: 'play none none reverse',
      }
    });
  }

  // Right element hover effects (desktop only)
  initRightElementHover() {
    const rightElements = document.querySelectorAll('.right-elem');

    rightElements.forEach((elem) => {
      const img = elem.querySelector('img');
      const h2 = elem.querySelector('h2');
      
      if (!img || !h2) return;

      // Mouse enter effects
      elem.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 4 });
        gsap.to(h2, { x: -20, opacity: 0.3 });
      });

      // Mouse leave effects
      elem.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 0 });
        gsap.to(h2, { x: 20, opacity: 1 });
      });

      // Mouse move tracking
      elem.addEventListener("mousemove", (event) => {
        const boundingRect = elem.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY - boundingRect.top;

        gsap.to(img, {
          x: offsetX + 150,
          y: offsetY - (img.offsetHeight / 2),
          ease: "power2.out"
        });
      });
    });
  }

  // Radius animation (desktop only)
  initRadiusAnimation() {
    const radiusElement = document.querySelector('.radius');
    if (!radiusElement) return;

    gsap.to('.radius', {
      y: '-100%',
      scrollTrigger: {
        trigger: '.contact',
        scroller: '.main',
        scrub: 2,
        start: 'top 60%',
        end: 'top 0%',
      }
    });
  }

  // Work button animation (desktop only)
  initWorkButtonAnimation() {
    const workBtn = document.querySelector('.work .btn');
    if (!workBtn) return;

    gsap.from('.work .btn', {
      x: -500,
      scrollTrigger: {
        trigger: '.contact',
        scroller: '.main',
        scrub: 2,
        start: 'top 45%',
        end: 'top 10%'
      }
    });
  }

  // Initialize scroll-triggered animations
  initScrollAnimations() {
    this.initGraphicsAnimation();
    this.initTextSplitAnimation();
    this.initNavAnimation();
  }

  // Graphics row animations
  initGraphicsAnimation() {
    const graphics = document.querySelector('.graphics');
    if (!graphics) return;

    const commonScrollTrigger = {
      trigger: '.graphics',
      scroller: '.main',
      start: 'top 50%',
      scrub: 2,
    };

    gsap.to('.graphics .row1', { x: -200, scrollTrigger: commonScrollTrigger });
    gsap.to('.graphics .row2', { x: 200, scrollTrigger: commonScrollTrigger });
  }

  // Text split animations
  initTextSplitAnimation() {
    const part1 = document.querySelector('.part-1');
    if (!part1) return;

    const commonAnimation = {
      y: 100,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.part-1',
        scroller: '.main',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      }
    };

    gsap.from('.part1-right p span', commonAnimation);
    gsap.from('.part1-left p span', commonAnimation);
  }

  // Navigation animation
  initNavAnimation() {
    const navSpans = document.querySelectorAll('nav h4 span');
    if (navSpans.length === 0) return;

    gsap.from('nav h4 span', { y: 50 });
  }

  // Loading animation sequence
  initLoadingAnimation() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Start loading text animation immediately
    const tl = gsap.timeline();
    
    // Animate through load texts
    for (let i = 1; i <= 5; i++) {
      tl.to(`.loader .loadtext${i}`, { opacity: 1, duration: 0.2 })
        .to(`.loader .loadtext${i}`, { opacity: 0, duration: 0.2 });
    }

    // Wait for window load, then hide loader
    tl.call(() => {
      // This ensures we wait for actual page load before hiding
      if (document.readyState === 'complete') {
        this.hideLoader();
      } else {
        window.addEventListener('load', () => this.hideLoader());
      }
    });
  }

  // Separate method to hide the loader
  hideLoader() {
    gsap.to('.loader', {
      borderRadius: '0px',
      height: 0,
      padding: 0,
      overflow: 'hidden',
      duration: 1,
      ease: "expo.inOut",
    }).then(() => {
      gsap.set('.loader', { display: 'none' });
    });
  }

  // Sidebar menu functionality
  initSidebar() {
    const menu = document.querySelector('.menu');
    const sidemenu = document.querySelector('#sidemenu');
    const openBtn = document.querySelector('.menu #openbtn');
    const closeBtn = document.querySelector('.menu #closebtn');
    const navTrigger = document.querySelector('nav .right-nav2 p');

    if (!menu || !sidemenu) return;

    const tl = gsap.timeline({ paused: true });

    // Menu transformation animations
    tl.to('.menu', {
      backgroundColor: '#334bd3',
      border: 'none'
    }, 'a')
    .to('.menu #closebtn', { scale: 1 }, 'a')
    .to('.menu #openbtn', { scale: 0 }, 'a')
    .to('#sidemenu', {
      x: '0',
      borderRadius: '0',
      duration: 1.3,
      ease: "expo.inOut",
    }, 'a')
    .from('#sidemenu h2', {
      x: 500,
      stagger: 0.05,
      delay: 0.2
    }, 'a');

    // Event listeners for menu controls
    [navTrigger, openBtn].forEach(element => {
      element?.addEventListener('click', () => tl.play());
    });

    closeBtn?.addEventListener('click', () => tl.reverse());
  }

  // Method to destroy animations on cleanup
  destroy() {
    if (this.locoScroll) {
      this.locoScroll.destroy();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // Method to refresh animations
  refresh() {
    if (this.locoScroll) {
      this.locoScroll.update();
    }
    ScrollTrigger.refresh();
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const animations = new WebsiteAnimations();
  
  // Optional: Expose to window for debugging
  window.websiteAnimations = animations;
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.websiteAnimations) {
      window.websiteAnimations.refresh();
    }
  }, 250);
});