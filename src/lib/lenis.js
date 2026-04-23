import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initLenis() {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  // Disable GSAP lag smoothing for Lenis compatibility
  gsap.ticker.lagSmoothing(0);

  // Sync ScrollTrigger with Lenis
  lenisInstance.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenisInstance.scrollTo(value, { immediate: true });
      }
      return lenisInstance.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.defaults({ scroller: document.body });

  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}

export { gsap, ScrollTrigger };
