// Counter Animation
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCounter = () => {
    let targetStr = counter.getAttribute('data-target');

    // Detect multiplier and currency
    let multiplier = 1;
    if (targetStr.toUpperCase().includes('M')) multiplier = 1000000;
    else if (targetStr.toUpperCase().includes('K')) multiplier = 1000;

    let isDollar = targetStr.includes('$');

    // Extract numeric value
    let target = parseFloat(targetStr.replace(/[^0-9.]/g, '')) * multiplier;
    let current = parseFloat(counter.innerText.replace(/[^0-9.]/g, '')) || 0;

    const increment = target / 200; // speed

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 15);
    } else {
      // Format numbers for display
      if (target >= 1000000) counter.innerText = (target / 1000000).toFixed(1) + "M+";
      else if (target >= 1000) counter.innerText = (target / 1000).toFixed(0) + "K+";
      else counter.innerText = Math.ceil(target) + "+";

      if (isDollar) counter.innerText = "$" + counter.innerText;
    }
  };

  updateCounter();
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioGrid = document.querySelector(".portfolio-grid");
const portfolioItems = document.querySelectorAll(".portfolio-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-filter");

    if (category === "all") {
      portfolioGrid.classList.add("masonry");
      portfolioItems.forEach(item => {
        item.style.display = "inline-block"; // show all in masonry
      });
    } else {
      portfolioGrid.classList.remove("masonry");
      portfolioItems.forEach(item => {
        if (item.getAttribute("data-category") === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  });
});
// Testimonials Slider
const track = document.querySelector(".testimonial-track");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
const visibleCards = 3; // ek sath kitne cards show karne hain

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 30; // width + margin
  track.style.transform = `translateX(${-index * cardWidth}px)`;
}

// Next
nextBtn.addEventListener("click", () => {
  if (index < cards.length - visibleCards) {
    index++;
  } else {
    index = 0; // loop back
  }
  updateCarousel();
});

// Prev
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
  } else {
    index = cards.length - visibleCards;
  }
  updateCarousel();
});

// Auto Slide
setInterval(() => {
  if (index < cards.length - visibleCards) {
    index++;
  } else {
    index = 0;
  }
  updateCarousel();
}, 4000);
// FAQ Toggle with Icon
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");

    // Close all other FAQs
    document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
    document.querySelectorAll(".faq-icon").forEach(i => i.textContent = "+");

    // Toggle current
    if (answer.style.display === "block") {
      answer.style.display = "none";
      icon.textContent = "+";
    } else {
      answer.style.display = "block";
      icon.textContent = "–";
    }
  });
});
