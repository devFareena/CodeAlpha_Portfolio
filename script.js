// scroll progress bar
var progress = document.getElementById('progress');
window.addEventListener('scroll', function () {
  var h = document.documentElement;
  var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
});

// scroll reveal
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { obs.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('in'); });
}

// custom cursor (dot snaps instantly, ring eases behind)
var isFinePointer = window.matchMedia('(pointer: fine)').matches;
var dot = document.getElementById('cursorDot');
var ring = document.getElementById('cursorRing');

if (isFinePointer && dot && ring) {
  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, .btn').forEach(function (el) {
    el.addEventListener('mouseenter', function () { ring.classList.add('active'); });
    el.addEventListener('mouseleave', function () { ring.classList.remove('active'); });
  });

  // magnetic buttons
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + (x * 0.25) + 'px,' + (y * 0.25) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0,0)';
    });
  });
}