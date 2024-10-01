//Toggle class active
const navbar = document.querySelector(".navbar-nav");
//ketika hamburger menu di click
document.querySelector("#menu").onclick = () => {
  navbar.classList.toggle("active");
};

// toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

//toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
const FormLogin = document.querySelector(".login");

document.querySelector("#shopping-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

document.querySelector("#profil-button").onclick = (e) => {
  FormLogin.classList.toggle("active");
  e.preventDefault();
};

//klik di luar sidebar untuk menghilangkan nav
const mn = document.querySelector("#menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart");

document.addEventListener("click", function (e) {
  if (!mn.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});
// scrol reveal
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(
  ".content h1, .cold, form textarea, .about h3, .menu-kami",
  { origin: "left" }
);
ScrollReveal().reveal(
  ".content p, .beverage-text, .row,  form .input-box, .about p, .about-img, .slider-promo",
  { origin: "right" }
);
ScrollReveal().reveal(".contact h2, .slider-donuts, .makna", {
  origin: "top",
});
ScrollReveal().reveal(" .menu-card, .Hot-beverage", {
  origin: "button",
});

//carousel

const carouselSlide = document.querySelector(".carousel-promo");
const carouselImages = document.querySelectorAll(".carousel-item img");

// Counter untuk melacak slide saat ini
let counter = 1;

// Jarak antar slide
const slideWidth = carouselImages[0].clientWidth;

// Geser ke slide pertama (elemen kedua karena ada slide duplikat di akhir)
carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

// Fungsi untuk menggeser carousel
function nextSlide() {
  if (counter >= carouselImages.length - 1) return;
  counter++;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
}

// Fungsi untuk otomatis menggeser ke slide berikutnya
function autoNextSlide() {
  setInterval(() => {
    nextSlide();
    if (counter >= carouselImages.length - 1) {
      setTimeout(() => {
        carouselSlide.style.transition = "none"; // Hentikan transisi sementara
        counter = 1; // Kembali ke slide pertama
        carouselSlide.style.transform = `translateX(${
          -slideWidth * counter
        }px)`;
        setTimeout(() => {
          carouselSlide.style.transition = "transform 0.5s ease-in-out"; // Aktifkan kembali transisi
        }, 50);
      }, 500);
    }
  }, 3000); // Ganti gambar setiap 3 detik
}

autoNextSlide();
