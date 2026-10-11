
class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);

        if (!this.slider) {
            console.error("Slider element was not found.");
            return;
        }

        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);
        this.prevButton = this.slider.querySelector(".prev");
        this.nextButton = this.slider.querySelector(".next");
        this.dotsContainer = this.slider.querySelector(".slider-dots");
        this.dots = [];
        this.currentIndex = 0;

        if (this.slides.length === 0) {
            console.error("No slides were found.");
            return;
        }

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSliderPosition();

        // Change the image every 4 seconds
        this.autoSlide = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    updateSliderPosition() {
        const slideWidth = this.slider.clientWidth;

        this.track.style.transform =
            `translateX(-${this.currentIndex * slideWidth}px)`;

        this.updateDots();
    }

    nextSlide() {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSliderPosition();
    }

    prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length)
            % this.slides.length;

        this.updateSliderPosition();
    }

    bindEvents() {
        this.nextButton.addEventListener("click", () => {
            this.nextSlide();
        });

        this.prevButton.addEventListener("click", () => {
            this.prevSlide();
        });

        window.addEventListener("resize", () => {
            this.updateSliderPosition();
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        this.dots = [];

        this.slides.forEach((slide, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("dot");
            dot.setAttribute("aria-label", `Show image ${index + 1}`);

            dot.addEventListener("click", () => {
                this.currentIndex = index;
                this.updateSliderPosition();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === this.currentIndex
            );
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ImageSlider(".slider");
});
