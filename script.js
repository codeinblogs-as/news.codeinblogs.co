let API_KEYS = [
  "23e15b71f3261e80310eb874b6e8f823",
  "48e078cba4a43ce1940c51b4e2d67974",
  "e46cbc025fa95601f6ed5b05f5ad05b0",
  "32689ac2383d6da40322a2d1a73f197e"
];
let currentApiKeyIndex = 0;
let selectedCountry = "in"; // Default country is set to "India"

const baseURL = "https://gnews.io/api/v4/";

function getNextApiKey() {
  const apiKey = API_KEYS[currentApiKeyIndex];
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  return apiKey;
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

async function fetchData(query) {
  showLoader(); // Show loader before making a request

  const apiKey = getNextApiKey();
  const url = `${baseURL}search?q=${query}&lang=en&country=${selectedCountry}&max=10&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  // Retry with the next API key if no results are found
  if (!data.articles || data.articles.length === 0) {
    const nextApiKey = getNextApiKey();
    const retryUrl = `${baseURL}search?q=${query}&lang=en&country=${selectedCountry}&max=10&apikey=${nextApiKey}`;
    const retryRes = await fetch(retryUrl);
    const retryData = await retryRes.json();

    hideLoader(); // Hide loader after content is loaded
    return retryData;
  }

  hideLoader(); // Hide loader after content is loaded
  return data;
}

// Initial loading
fetchData("all").then((data) => renderMain(data.articles));

let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobilemenu.classList.toggle("hidden");
});

// Added country selection functionality
const countrySelect = document.getElementById("countrySelect","countrySelectMobile");

countrySelect.addEventListener("change", () => {
  selectedCountry = countrySelect.value;
  // Reload news based on the selected country
  fetchData("all").then((data) => renderMain(data.articles));
});

function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].image) {
      mainHTML += `
        <div class="card">
          <a href=${arr[i].url} target="_blank">
            <center><img src=${arr[i].image} lazy="loading" /></center>
            <h4>${arr[i].title}</h4>
            <div class="publishbyDate">
              <p>${arr[i].source.name}</p>
              <span>•</span>
              <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
            </div>
            <div class="desc">
              ${arr[i].description}
            </div>
          </a>
        </div>
      `;
    }
  }

  document.querySelector("main").innerHTML = mainHTML;
}

const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchInput.value);
  renderMain(data.articles);
});

searchBtnMobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchInputMobile.value);
  renderMain(data.articles);
});

async function Search(query) {
  const data = await fetchData(query);

  if (data.articles && data.articles.length > 0) {
    renderMain(data.articles);
  } else {
    document.querySelector("main").innerHTML = '<p style="color:red; font-size:1rem; font-weight:600;">No news found on this topic. Please try a different search term.</p>';
  }
}
