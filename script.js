const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const searchBtn = document.getElementById("searchBtn");
const cards = [...document.querySelectorAll(".property-card")];
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const propertySelect = document.getElementById("propertySelect");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

function filterProperties() {
  const query = searchInput.value.trim().toLowerCase();
  const type = typeFilter.value;
  let visible = 0;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const location = card.dataset.location.toLowerCase();
    const cardType = card.dataset.type;

    const textMatch = !query || name.includes(query) || location.includes(query) || cardType.toLowerCase().includes(query);
    const typeMatch = type === "all" || cardType === type;
    const show = textMatch && typeMatch;

    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  resultCount.textContent = `${visible} propert${visible === 1 ? "y" : "ies"} available`;
  noResults.style.display = visible ? "none" : "block";

  document.getElementById("properties").scrollIntoView({ behavior: "smooth", block: "start" });
}

searchBtn.addEventListener("click", filterProperties);
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") filterProperties();
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    typeFilter.value = button.dataset.category;
    searchInput.value = "";
    filterProperties();
  });
});

document.querySelectorAll(".favorite").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active") ? "♥" : "♡";
  });
});

document.querySelectorAll(".details-btn").forEach(button => {
  button.addEventListener("click", () => {
    propertySelect.value = button.dataset.property;
    document.getElementById("enquiry").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("enquiryForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const selected = propertySelect.value;
  const message = document.getElementById("formMessage");

  message.textContent = selected
    ? `Thanks, ${name}! Your enquiry for ${selected} has been received.`
    : `Thanks, ${name}! Your enquiry has been received.`;

  e.target.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
