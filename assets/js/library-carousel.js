(function () {
  const carousels = document.querySelectorAll("[data-library-carousel]");
  if (!carousels.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  carousels.forEach((carousel) => {
    const shell = carousel.closest(".library-carousel-shell");
    const viewport = carousel.querySelector(".library-carousel-viewport");
    const items = Array.from(carousel.querySelectorAll(".library-carousel-item"));
    const prevBtn = carousel.querySelector(".library-carousel-nav--prev");
    const nextBtn = carousel.querySelector(".library-carousel-nav--next");
    const dotsRoot = carousel.querySelector(".library-carousel-dots");
    const counter = carousel.querySelector(".library-carousel-counter");

    if (!viewport || !items.length) return;

    let activeIndex = 0;
    let ticking = false;

    function getClosestIndex() {
      const viewportRect = viewport.getBoundingClientRect();
      const centerX = viewportRect.left + viewportRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(itemCenterX - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    }

    function updateDots() {
      if (!dotsRoot) return;

      dotsRoot.querySelectorAll(".library-carousel-dot").forEach((dot, index) => {
        const selected = index === activeIndex;
        dot.classList.toggle("is-active", selected);
        dot.setAttribute("aria-selected", selected ? "true" : "false");
        dot.tabIndex = selected ? 0 : -1;
      });
    }

    function updateCounter() {
      if (!counter) return;
      counter.textContent = `${activeIndex + 1} / ${items.length}`;
    }

    function updateCarousel() {
      activeIndex = getClosestIndex();

      items.forEach((item, index) => {
        const distance = Math.abs(index - activeIndex);
        item.dataset.distance = String(Math.min(distance, 4));
        item.classList.toggle("is-active", distance === 0);
        item.setAttribute("aria-hidden", distance > 2 ? "true" : "false");
      });

      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === items.length - 1;

      updateDots();
      updateCounter();
    }

    function markInteracted() {
      shell?.classList.add("is-interacted");
    }

    function onScroll() {
      markInteracted();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateCarousel();
        ticking = false;
      });
    }

    function scrollToIndex(index) {
      const item = items[index];
      if (!item) return;

      markInteracted();
      item.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    if (dotsRoot && items.length > 1) {
      dotsRoot.innerHTML = "";
      items.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "library-carousel-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `${index + 1}`);
        dot.addEventListener("click", () => scrollToIndex(index));
        dotsRoot.appendChild(dot);
      });
    } else if (dotsRoot) {
      dotsRoot.hidden = true;
    }

    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCarousel);

    prevBtn?.addEventListener("click", () => scrollToIndex(Math.max(activeIndex - 1, 0)));
    nextBtn?.addEventListener("click", () => scrollToIndex(Math.min(activeIndex + 1, items.length - 1)));

    items.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        if (index === activeIndex) return;

        const link = event.target.closest("a");
        if (link) event.preventDefault();
        scrollToIndex(index);
      });
    });

    carousel.classList.toggle("has-multiple", items.length > 1);
    updateCarousel();
  });
})();
