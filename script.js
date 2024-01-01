const API_KEY = "48e078cba4a43ce1940c51b4e2d67974";
const baseURL = "https://gnews.io/api/v4/";

async function fetchData(query) {
  const url = `${baseURL}search?q=${query}&lang=en&country=us&max=10&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

fetchData("all").then((data) => renderMain(data.articles));

// menu btn
let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobilemenu.classList.toggle("hidden");
});

// rendering Tech news
function renderMain(arr) {
  let mainHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].image) {
      mainHTML += `
        <div class="card">
          <a href=${arr[i].url}>
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
  renderMain(data.articles);
}
