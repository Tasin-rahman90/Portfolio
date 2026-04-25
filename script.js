/* ═══════════════════════════════════════════════
   TASIN — PORTFOLIO JAVASCRIPT
   script.js
═══════════════════════════════════════════════ */

"use strict";

/* ─── 1. LOADER ───────────────────────────────── */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("done");
  }, 1800);
});


/* ─── 2. CUSTOM CURSOR ───────────────────────── */
const cursor   = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

// Smooth follower with RAF
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + "px";
  follower.style.top  = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale on hover
document.querySelectorAll("a, button, .skill-card, .project-item, .srv-card, .testi-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform   = "translate(-50%,-50%) scale(2.5)";
    follower.style.transform = "translate(-50%,-50%) scale(1.8)";
    follower.style.borderColor = "var(--accent)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform   = "translate(-50%,-50%) scale(1)";
    follower.style.transform = "translate(-50%,-50%) scale(1)";
    follower.style.borderColor = "rgba(0,255,135,0.4)";
  });
});


/* ─── 3. NAV: SCROLL EFFECT ──────────────────── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });


/* ─── 4. HAMBURGER / MOBILE MENU ─────────────── */
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  // Animate the two bars into X
  const bars = hamburger.querySelectorAll("span");
  if (isOpen) {
    bars[0].style.transform = "translateY(6.5px) rotate(45deg)";
    bars[1].style.transform = "translateY(-6.5px) rotate(-45deg)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.transform = "";
  }
});

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    const bars = hamburger.querySelectorAll("span");
    bars[0].style.transform = "";
    bars[1].style.transform = "";
  });
});


/* ─── 5. SMOOTH SCROLL ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* ─── 6. SCROLL REVEAL (IntersectionObserver) ─── */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

revealEls.forEach(el => revealObserver.observe(el));


/* ─── 7. SKILL BAR FILL (on scroll) ─────────── */
const skillFills = document.querySelectorAll(".skill-fill");

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.dataset.w + "%";
      entry.target.style.width = targetWidth;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(bar => barObserver.observe(bar));


/* ─── 8. COUNTER ANIMATION ───────────────────── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);

  function tick() {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count, 10);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));


/* ─── 9. HERO PARALLAX (subtle) ─────────────── */
const heroGrid = document.querySelector(".hero-grid");
const orbs     = document.querySelectorAll(".orb");

window.addEventListener("scroll", () => {
  const sy = window.scrollY;
  if (heroGrid) heroGrid.style.transform = `translateY(${sy * 0.15}px)`;
  orbs.forEach((orb, i) => {
    const speed = 0.08 + i * 0.04;
    orb.style.transform = `translate(0, ${sy * speed}px)`;
  });
}, { passive: true });


/* ─── 10. HERO MOUSE PARALLAX ─────────────────── */
const heroSection = document.getElementById("hero");
if (heroSection) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const cy = (e.clientY - rect.top  - rect.height / 2) / rect.height;

    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 15;
      orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    orbs.forEach(orb => { orb.style.transform = ""; });
  });
}


/* ─── 11. CONTACT FORM ───────────────────────── */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn  = form.querySelector("button[type='submit'] span");
    const orig = btn.textContent;
    btn.textContent = "Message Sent ✓";
    form.querySelectorAll("input, textarea").forEach(inp => inp.value = "");
    setTimeout(() => { btn.textContent = orig; }, 3000);
  });
}


/* ─── 12. PROJECT ITEM: TILT EFFECT ─────────── */
document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
    item.style.transform = `translateX(1rem) perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
    item.style.transition = "transform 0.5s ease";
  });
});


/* ─── 13. ACTIVE NAV LINK HIGHLIGHT ─────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.style.color = isActive ? "var(--accent)" : "";
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


/* ─── 14. FLOAT BADGES ENTRANCE ─────────────── */
const floatBadges = document.querySelectorAll(".float-badge");
setTimeout(() => {
  floatBadges.forEach((badge, i) => {
    setTimeout(() => {
      badge.style.opacity   = "1";
      badge.style.transform = "none";
    }, i * 200);
  });
}, 2500);

floatBadges.forEach(badge => {
  badge.style.opacity   = "0";
  badge.style.transform = "translateY(10px)";
  badge.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});


/* ─── 15. SKILL CARD TILT ────────────────────── */
document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-5px) perspective(400px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});