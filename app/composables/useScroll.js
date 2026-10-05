export function useScroll() {
  function stopScroll() {
    document.documentElement.style.overflow = "hidden";
  }

  function startScroll() {
    document.documentElement.style.overflow = "";
  }

  return {
    stopScroll,
    startScroll,
  };
}
