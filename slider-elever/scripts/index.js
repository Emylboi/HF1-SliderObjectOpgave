/* Object Array which we get data from */
let slideData = [
  {
    src: "./assets/img/img1.jpeg",
    alt: "Billede 1",
    description: "Virkelig lækker sofa",
    class: "test1",
    link: "https://www.google.dk/",
  },
  {
    src: "./assets/img/img2.jpg",
    alt: "Billede 2",
    description: "Kaffe maskine",
    class: "test2",
    link: "https://www.youtube.com/",
  },
  {
    src: "./assets/img/img3.jpg",
    alt: "Billede 3",
    description: "Nyt køkken",
    class: "test3",
    link: "https://www.facebook.com/",
  },
];

/* We put the class ".slides" from HTML into a variable */
const sliderContainer = document.querySelector(".slides");

/* Foreach slide in the "slideData" array, we add a new div that contains data from the array*/
slideData.forEach((slide) => {
  sliderContainer.innerHTML += ` 
        <div class="single-slide"> 
            <div class="slide-content">
                <p class="${slide.class}">${slide.description}</p>
            </div>
              <img src="${slide.src}" alt="${slide.alt}">
              <a href="${slide.link}" class="linkButton">LINK</a>
        </div>
    `;
});

const slides = document.querySelectorAll("#slider01 .single-slide");
const nextBtn = document.querySelector("[data-direction=next]");
const previousBtn = document.querySelector("[data-direction=previous]");

let slidesLength =
  slides.length - 1; /* Index'et på sidste billede i slideren */
let currentImageIndex = 0;

const setActiveSlide = (index) => {
  /* Funktionen bestemmer hvilket billede der vises */

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[index].classList.add(
    "active"
  ); /* får index fra currentImageIndex variablen, og smider 'active' på denne */

  let display = document.querySelector(".display");
  display.innerHTML = `${currentImageIndex + 1} ud af ${slides.length}`;
};

const next = () => {
  if (currentImageIndex >= slidesLength) {
    currentImageIndex = 0;
  } else {
    currentImageIndex += 1;
  }

  setActiveSlide(currentImageIndex); //Skal køres hver gang der trykkes på knapperne, for at registrere at currentImageIndex nu er noget andet, og at slideren skal skifte op eller ned
};

function setAutoSlide() {
  function updateCounter() {
    next();
    autoSlideTimeout = setTimeout(updateCounter, 3000);
  }
  updateCounter();
}
setAutoSlide();

const previous = () => {
  if (currentImageIndex === 0) {
    currentImageIndex = slidesLength;
  } else {
    currentImageIndex -= 1;
  }

  setActiveSlide(currentImageIndex);
};

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    next();
  } else if (event.key == "ArrowLeft") {
    previous();
  }
});

/* Hvis funktionerne eksisterer */
if (nextBtn && previousBtn) {
  nextBtn.addEventListener("click", next);
  previousBtn.addEventListener("click", previous);
}

/* Skriv denne lige efter setActiveSlide funktionen er skrevet - så vises der et billede med det samme*/
setActiveSlide(
  currentImageIndex
); /* Skal køres, for at vise et billede til at starte med */
