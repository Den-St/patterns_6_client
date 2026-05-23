/**
 * Creates a throttled version of a function.
 * The function will be called at most once every `interval` ms.
 *
 * @param {Function} fn - The function to throttle
 * @param {number} interval - Minimum interval between calls in milliseconds
 * @returns {Function} Throttled function with a .cancel() method
 */
export function throttle(fn, interval) {
  let lastCallTime = 0;
  let timerId = null;

  const throttled = (...args) => {
    const now = Date.now();
    const elapsed = now - lastCallTime;

    if (elapsed >= interval) {
      lastCallTime = now;
      fn(...args);
    } else {
      // Schedule a trailing call
      if (timerId !== null) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        lastCallTime = Date.now();
        timerId = null;
        fn(...args);
      }, interval - elapsed);
    }
  };

  throttled.cancel = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return throttled;
}
