window.ladi_viewport = function (b) {
  var a = document;
  b = b ? b : "innerWidth";
  var c = window[b];
  var d = c < 768;
  if (
    typeof window.ladi_is_desktop == "undefined" ||
    window.ladi_is_desktop == undefined
  ) {
    window.ladi_is_desktop = !d;
  }
  var e = 1200;
  var f = 420;
  var g = "";
  if (!d) {
    g = "width=" + e + ",user-scalable=no,initial-scale=1.0";
  } else {
    var h = 1;
    var i = f;
    if (i != c) {
      h = c / i;
    }
    g =
      "width=" +
      i +
      ",user-scalable=no,initial-scale=" +
      h +
      ",minimum-scale=" +
      h +
      ",maximum-scale=" +
      h;
  }
  var j = a.getElementById("viewport");
  if (!j) {
    j = a.createElement("meta");
    j.id = "viewport";
    j.name = "viewport";
    a.head.appendChild(j);
  }
  j.setAttribute("content", g);
};
window.ladi_viewport();
window.ladi_fbq_data = [];
window.ladi_fbq = function () {
  window.ladi_fbq_data.push(arguments);
};
window.ladi_ttq_data = [];
window.ladi_ttq = function () {
  window.ladi_ttq_data.push(arguments);
};

/* ===== NEXT SCRIPT SECTION ===== */

window.lazyload_run = function (dom, is_first, check_dom_rect) {
  if (
    check_dom_rect &&
    (document.body.clientWidth <= 0 || document.body.clientheight <= 0)
  ) {
    return setTimeout(function () {
      window.lazyload_run(dom, is_first, check_dom_rect);
    }, 1);
  }
  var style_lazyload = document.getElementById("style_lazyload");
  var list_element_lazyload = dom.querySelectorAll(
    "body.lazyload .ladi-overlay, body.lazyload .ladi-box, body.lazyload .ladi-button-background, body.lazyload .ladi-collection-item, body.lazyload .ladi-countdown-background, body.lazyload .ladi-form-item-background, body.lazyload .ladi-form-label-container .ladi-form-label-item.image, body.lazyload .ladi-frame-background, body.lazyload .ladi-gallery-view-item, body.lazyload .ladi-gallery-control-item, body.lazyload .ladi-headline, body.lazyload .ladi-image-background, body.lazyload .ladi-image-compare, body.lazyload .ladi-list-paragraph ul li, body.lazyload .ladi-section-background, body.lazyload .ladi-survey-option-background, body.lazyload .ladi-survey-option-image, body.lazyload .ladi-tabs-background, body.lazyload .ladi-video-background, body.lazyload .ladi-banner, body.lazyload .ladi-spin-lucky-screen, body.lazyload .ladi-spin-lucky-start"
  );
  var docEventScroll = window;
  for (var i = 0; i < list_element_lazyload.length; i++) {
    var rect = list_element_lazyload[i].getBoundingClientRect();
    if (
      rect.x == "undefined" ||
      rect.x == undefined ||
      rect.y == "undefined" ||
      rect.y == undefined
    ) {
      rect.x = rect.left;
      rect.y = rect.top;
    }
    var offset_top = rect.y + window.scrollY;
    if (
      offset_top >= window.scrollY + window.innerHeight ||
      window.scrollY >= offset_top + list_element_lazyload[i].offsetHeight
    ) {
      list_element_lazyload[i].classList.add("ladi-lazyload");
    }
  }
  if (typeof style_lazyload != "undefined" && style_lazyload != undefined) {
    style_lazyload.parentElement.removeChild(style_lazyload);
  }
  document.body.classList.remove("lazyload");
  var currentScrollY = window.scrollY;
  var stopLazyload = function (event) {
    if (event.type == "scroll" && window.scrollY == currentScrollY) {
      currentScrollY = -1;
      return;
    }
    docEventScroll.removeEventListener("scroll", stopLazyload);
    list_element_lazyload = document.getElementsByClassName("ladi-lazyload");
    while (list_element_lazyload.length > 0) {
      list_element_lazyload[0].classList.remove("ladi-lazyload");
    }
  };
  if (is_first) {
    var scrollEventPassive = null;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function () {
          scrollEventPassive = { passive: true };
        },
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}
    docEventScroll.addEventListener("scroll", stopLazyload, scrollEventPassive);
  }
  return dom;
};
window.lazyload_run(document, true, true);

// Cho phép chuột phải hoạt động bình thường
window.addEventListener(
  "contextmenu",
  function (e) {
    e.stopPropagation();
  },
  true
);

/* ===== SCROLL ANIMATION EFFECTS ===== */

// Hàm kiểm tra xem element có nằm trong viewport không
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight * 0.75 &&
    rect.bottom >= window.innerHeight * 0.25
  );
}

// Hàm tính độ khoảng cách từ top viewport
function getScrollPercentage(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const distance = rect.top;

  // Tính phần trăm: 0 khi element ở dưới viewport, 100 khi ở trên
  if (distance > viewportHeight) return 0;
  if (distance < -rect.height) return 100;

  return ((viewportHeight - distance) / (viewportHeight + rect.height)) * 100;
}

// 1. Fade In Effect cho các card "Lộ trình khóa học"
function initCardFadeInEffect() {
  const cards = document.querySelectorAll("#6div .bg-\\[\\#1E3874\\]");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  window.addEventListener("scroll", () => {
    cards.forEach((card) => {
      if (isElementInViewport(card)) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });
}

// 2. Number Counter Effect cho các con số/giá trị
function initNumberCounterEffect() {
  const elements = document.querySelectorAll(".text-yellow-600");

  elements.forEach((el) => {
    if (!el.innerText.match(/\d+/)) return;

    el.style.transition = "color 0.3s ease";
    el.dataset.counted = "false";

    window.addEventListener("scroll", () => {
      if (isElementInViewport(el) && el.dataset.counted === "false") {
        el.dataset.counted = "true";
        el.style.color = "#fbbf24";
        el.style.fontWeight = "bold";
      }
    });
  });
}

// 3. Parallax Effect cho background images
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll(
    '[style*="background-image"]'
  );

  window.addEventListener("scroll", () => {
    parallaxElements.forEach((el) => {
      const scrollPosition = window.scrollY;
      const elementPosition = el.getBoundingClientRect().top + scrollPosition;
      const distance = scrollPosition - (elementPosition - window.innerHeight);
      const parallaxValue = distance * 0.5;

      if (isElementInViewport(el)) {
        el.style.backgroundPosition = `center calc(50% + ${parallaxValue}px)`;
      }
    });
  });
}

// 4. Text Highlight Effect khi scroll đến chỗ
function initTextHighlightEffect() {
  const headings = document.querySelectorAll("h1, h2, .ladi-paragraph");

  headings.forEach((heading) => {
    heading.style.transition = "all 0.4s ease";
    heading.dataset.highlighted = "false";
  });

  window.addEventListener("scroll", () => {
    headings.forEach((heading) => {
      if (
        isElementInViewport(heading) &&
        heading.dataset.highlighted === "false"
      ) {
        heading.dataset.highlighted = "true";
        heading.style.opacity = "1";
        heading.style.transform = "translateX(0)";

        if (
          heading.classList.contains("text-yellow-400") ||
          heading.style.webkitTextStroke
        ) {
          heading.style.textShadow = "0 0 10px rgba(251, 191, 36, 0.5)";
        }
      }
    });
  });
}

// 5. List Item Cascade Effect
function initListCascadeEffect() {
  const lists = document.querySelectorAll("ul, .ladi-list-paragraph ul");

  lists.forEach((list) => {
    const items = list.querySelectorAll("li");

    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      item.style.transitionDelay = `${index * 0.08}s`;
    });

    window.addEventListener("scroll", () => {
      if (isElementInViewport(list)) {
        items.forEach((item) => {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        });
      }
    });
  });
}

// 6. Button Hover Glow Effect
function initButtonGlowEffect() {
  const buttons = document.querySelectorAll(
    'button, .ladi-button, a[class*="bg-"]'
  );

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.boxShadow =
        "0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)";
      btn.style.transition = "all 0.3s ease";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.boxShadow = "none";
    });
  });
}

// 7. Form Input Focus Animation
function initFormInputAnimation() {
  const inputs = document.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.transition = "all 0.3s ease";
      input.style.borderColor = "#3b82f6";
      input.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
      input.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", () => {
      input.style.boxShadow = "none";
      input.style.transform = "scale(1)";
    });
  });
}

// 8. Image Zoom Effect on Scroll
function initImageZoomEffect() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.style.transition = "transform 0.6s ease";

    window.addEventListener("scroll", () => {
      if (isElementInViewport(img)) {
        const scrollPercent = getScrollPercentage(img);
        const scale = 1 + (scrollPercent / 100) * 0.1; // Max 1.1x
        img.style.transform = `scale(${scale})`;
      }
    });
  });
}

// 9. Background Color Fade Effect
function initBackgroundFadeEffect() {
  const sections = document.querySelectorAll('[class*="background"]');

  sections.forEach((section) => {
    window.addEventListener("scroll", () => {
      if (isElementInViewport(section)) {
        const scrollPercent = getScrollPercentage(section);
        const opacity = Math.min(scrollPercent / 100, 1);
        section.style.opacity = opacity;
        section.style.transition = "opacity 0.3s ease";
      }
    });
  });
}

// 10. Card Hover Scale Effect
function initCardHoverScaleEffect() {
  const hoverCards = document.querySelectorAll(
    ".bg-white.rounded-lg.shadow-md, " +
      ".ladi-frame.ladi-frame-bg, " +
      ".testimonial-card"
  );

  hoverCards.forEach((card) => {
    card.style.transition = "all 0.3s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05) translateY(-5px)";
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1) translateY(0)";
      card.style.boxShadow = "";
    });
  });
}

// Initialize tất cả effects khi DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  initCardFadeInEffect();
  initNumberCounterEffect();
  initParallaxEffect();
  initTextHighlightEffect();
  initListCascadeEffect();
  initButtonGlowEffect();
  initFormInputAnimation();
  initImageZoomEffect();
  initBackgroundFadeEffect();
  initCardHoverScaleEffect();
});
