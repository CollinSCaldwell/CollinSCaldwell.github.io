
let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  let arrow = document.getElementById("Indicator")
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  document.getElementById("Indicator").style.top = (scrollPercentRounded - (scrollPercentRounded / 100) * 15 ).toString(10) + "%"
}

document.addEventListener('scroll', (e) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});