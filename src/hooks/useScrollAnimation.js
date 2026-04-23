import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation — Reusable GSAP scroll animation hook
 * @param {object} options - Animation config
 * @param {string} options.selector - CSS selector for animated elements (default: '.reveal')
 * @param {number} options.duration - Animation duration in seconds (default: 0.8)
 * @param {number} options.stagger - Stagger delay between elements (default: 0.12)
 * @param {string} options.ease - GSAP ease string (default: 'power3.out')
 * @param {number} options.y - Starting Y offset (default: 50)
 * @param {string} options.start - ScrollTrigger start position (default: 'top 85%')
 */
export function useScrollAnimation(options = {}) {
  const containerRef = useRef(null);
  const {
    selector = '.reveal',
    duration = 0.8,
    stagger = 0.12,
    ease = 'power3.out',
    y = 50,
    x = 0,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, duration, stagger, ease, y, x, start]);

  return containerRef;
}

/**
 * useHeroAnimation — Staggers hero text elements on page load
 * @param {Array} targets - Array of refs or selector strings
 */
export function useHeroAnimation(targets = []) {
  useEffect(() => {
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power4.out',
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);
}

/**
 * useCountUp — Animates number from 0 to target when scrolled into view
 * @param {object} options
 */
export function useCountUp(options = {}) {
  const ref = useRef(null);
  const { end = 100, duration = 2, suffix = '', prefix = '' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [end, duration, suffix, prefix]);

  return ref;
}
