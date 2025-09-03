document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a");
  const images = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");

  let currentIndex = 0;

  // --- Filtering ---
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const filter = link.getAttribute("data-filter");

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      images.forEach(img => {
        img.classList.toggle(
          "hidden",
          !(filter === "all" || img.dataset.category === filter)
        );
      });
    });
  });

  // --- Open Lightbox ---
  function openLightbox(index) {
    const img = images[index];
    if (!img || img.classList.contains("hidden")) return;

    currentIndex = index;

    // Show the overlay
    lightbox.style.display = "block";

    // Use full-size image if provided
    lightboxImg.classList.remove("email-full");
    lightboxImg.src = img.dataset.full || img.src;

    // Apply email mode if needed
    const isEmail = img.dataset.category === "emails";
    if (isEmail) {
      lightboxImg.classList.add("email-full");
    }

    // Set caption
    lightboxTitle.textContent = img.dataset.title || "";
    lightboxDesc.textContent = img.dataset.description || "";

    // Ensure we start at the very top AFTER the image loads (prevents layout-shift cropping)
    lightboxImg.onload = () => {
      lightbox.scrollTop = 0;
    };
    // Also set immediately in case the image is cached
    lightbox.scrollTop = 0;
  }

  // Image click → open lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // --- Navigation (skips hidden images due to filtering) ---
  function showNext() {
    let nextIndex = currentIndex;
    do {
      nextIndex = (nextIndex + 1) % images.length;
    } while (images[nextIndex].classList.contains("hidden"));
    openLightbox(nextIndex);
  }
  function showPrev() {
    let prevIndex = currentIndex;
    do {
      prevIndex = (prevIndex - 1 + images.length) % images.length;
    } while (images[prevIndex].classList.contains("hidden"));
    openLightbox(prevIndex);
  }

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // --- Keyboard Support ---
  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") lightbox.style.display = "none";
    }
  });

  // --- Close Lightbox ---
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Clicking dark backdrop (but not the image/caption) closes the lightbox
  lightbox.addEventListener("click", e => {
    const body = document.getElementById("lightbox-body");
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // --- Default filter: All ---
  document.querySelector('[data-filter="all"]').classList.add("active");
});
