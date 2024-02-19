import { quotes } from "../data/quotes.json";

const carouselInner = document.querySelector(".carousel-inner");

document.addEventListener("DOMContentLoaded", async function () {
  quotes.forEach((quote, i) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (i === 0) {
      carouselItem.classList.add("active");
    }

    carouselItem.innerHTML = `
      <h3>
    ${quote}
      </h3>
      `;
    carouselInner.appendChild(carouselItem);
  });
});
