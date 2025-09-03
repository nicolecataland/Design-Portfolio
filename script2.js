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
//   function openLightbox(index) {
//     const img = images[index];
//     if (!img || img.classList.contains("hidden")) return;

//     currentIndex = index;
//     lightbox.style.display = "flex";
//     lightboxImg.src = img.dataset.full || img.src; // <-- full-size if available
//     lightboxTitle.textContent = img.dataset.title || "";
//     lightboxDesc.textContent = img.dataset.description || "";
//   }

// --- Open Lightbox ---
function openLightbox(index) {
  const img = images[index];
  if (!img || img.classList.contains("hidden")) return;

  currentIndex = index;

  // Reset
  lightbox.classList.remove("email-mode");
  lightbox.style.display = "flex";

  // Load full-size image
  lightboxImg.src = img.dataset.full || img.src;

  // Reset email class
  lightboxImg.classList.remove("email-full");

  if (img.dataset.category === "emails") {
    // Switch container to block layout
    lightbox.classList.add("email-mode");
    lightboxImg.classList.add("email-full");

    // Force scroll to top
    lightbox.scrollTop = 0;
  }

  lightboxTitle.textContent = img.dataset.title || "";
  lightboxDesc.textContent = img.dataset.description || "";
}






  // Image click → open lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // --- Navigation ---
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
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") lightbox.style.display = "none";
    }
  });

  // --- Close Lightbox ---
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  // --- Default filter: All ---
  document.querySelector('[data-filter="all"]').classList.add("active");
});




// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll(".sidebar a");
//   const images = document.querySelectorAll(".gallery img");
//   const lightbox = document.getElementById("lightbox");
//   const lightboxImg = document.getElementById("lightbox-img");
//   const lightboxTitle = document.getElementById("lightbox-title");
//   const lightboxDesc = document.getElementById("lightbox-desc");
//   const closeBtn = document.querySelector(".lightbox .close");
//   const prevBtn = document.querySelector(".lightbox .prev");
//   const nextBtn = document.querySelector(".lightbox .next");

//   let currentIndex = 0;

//   // --- Filtering ---
//   links.forEach(link => {
//     link.addEventListener("click", e => {
//       e.preventDefault();
//       const filter = link.getAttribute("data-filter");

//       // Highlight active link
//       links.forEach(l => l.classList.remove("active"));
//       link.classList.add("active");

//       // Show/hide images
//       images.forEach(img => {
//         img.style.display =
//           filter === "all" || img.dataset.category === filter ? "block" : "none";
//       });
//     });
//   });

//   // --- Open Lightbox ---
//   function openLightbox(index) {
//     const img = images[index];
//     if (!img || img.style.display === "none") return; // skip hidden images

//     currentIndex = index;
//     lightbox.style.display = "flex";
//     lightboxImg.src = img.src;
//     lightboxTitle.textContent = img.dataset.title || "";
//     lightboxDesc.textContent = img.dataset.description || "";
//   }

//   // Image click → open lightbox
//   images.forEach((img, index) => {
//     img.addEventListener("click", () => openLightbox(index));
//   });

//   // --- Navigation ---
//   function showNext() {
//     let nextIndex = currentIndex;
//     do {
//       nextIndex = (nextIndex + 1) % images.length;
//     } while (images[nextIndex].style.display === "none");
//     openLightbox(nextIndex);
//   }

//   function showPrev() {
//     let prevIndex = currentIndex;
//     do {
//       prevIndex = (prevIndex - 1 + images.length) % images.length;
//     } while (images[prevIndex].style.display === "none");
//     openLightbox(prevIndex);
//   }

//   nextBtn.addEventListener("click", showNext);
//   prevBtn.addEventListener("click", showPrev);

//   // --- Keyboard Support ---
//   document.addEventListener("keydown", e => {
//     if (lightbox.style.display === "flex") {
//       if (e.key === "ArrowRight") showNext();
//       if (e.key === "ArrowLeft") showPrev();
//       if (e.key === "Escape") lightbox.style.display = "none";
//     }
//   });

//   // --- Close Lightbox ---
//   closeBtn.addEventListener("click", () => {
//     lightbox.style.display = "none";
//   });

//   lightbox.addEventListener("click", e => {
//     if (e.target === lightbox) lightbox.style.display = "none";
//   });

//   // --- Set Default Active Filter ---
//   document.querySelector('[data-filter="all"]').classList.add("active");
// });
