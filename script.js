// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
const mobileNavClose = document.getElementById("mobileNavClose");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

// Open mobile menu
mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
});

// Close mobile menu
mobileNavClose.addEventListener("click", closeMobileMenu);

// Close menu when clicking on a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    closeMobileMenu();

    // Update active link
    mobileNavLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Also update desktop nav active state
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((l) => l.classList.remove("active"));
    const targetHref = link.getAttribute("href");
    const correspondingNavLink = document.querySelector(
      `.nav-links a[href="${targetHref}"]`
    );
    if (correspondingNavLink) {
      correspondingNavLink.classList.add("active");
    }
  });
});

// Close menu when clicking outside
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  mobileNav.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Enhanced navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide navbar on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    navbar.style.transform =
      window.innerWidth > 1024
        ? "translateX(-50%) translateY(-100%)"
        : "translateY(-100%)";
  } else {
    navbar.style.transform =
      window.innerWidth > 1024
        ? "translateX(-50%) translateY(0)"
        : "translateY(0)";
  }

  lastScrollY = currentScrollY;
});

// Active navigation link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Also update mobile nav active state
  mobileNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
    }
  });
}, observerOptions);

// Observe elements with staggered animations
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Service cards staggered animation
const serviceCards = document.querySelectorAll(".service-card");
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 150);
    }
  });
}, observerOptions);

serviceCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  serviceObserver.observe(card);
});

// Enhanced button interactions
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.02)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Calendly integration with analytics
function openCalendly() {
  if (typeof Calendly !== "undefined") {
    Calendly.initPopupWidget({
      url: "https://calendly.com/alopezramirez007/30min",
    });

    // Analytics tracking (if needed)
    if (typeof gtag !== "undefined") {
      gtag("event", "calendly_open", {
        event_category: "engagement",
        event_label: "booking_attempt",
      });
    }
  } else {
    // Fallback for when Calendly isn't loaded
    window.open("https://calendly.com/alopezramirez007/30min", "_blank");
  }
  return false;
}

// Logo intro animation timing
setTimeout(() => {
  const logoOverlay = document.querySelector(".logo-intro-overlay");
  if (logoOverlay) {
    logoOverlay.style.display = "none";
  }
}, 4000);

// Initialize page
window.addEventListener("load", () => {
  // Trigger initial animations
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 4500);
});

// Error handling for Calendly
window.addEventListener("error", (e) => {
  if (e.message.includes("Calendly")) {
    console.warn("Calendly failed to load, using fallback");
  }
});
