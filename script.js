let API_KEY = "";
const baseURL = "https://gnews.io/api/v4/";

function getCurrentHour() {
  return new Date().getHours();
}

function setAPIKey() {
  const currentHour = getCurrentHour();

  if (currentHour >= 6 && currentHour < 9) {
    API_KEY = "e46cbc025fa95601f6ed5b05f5ad05b0";
  } else if (currentHour >= 9 && currentHour < 12) {
    API_KEY = "32689ac2383d6da40322a2d1a73f197e";
  } else if (currentHour >= 12 && currentHour < 16) {
    API_KEY = "0ca3b453d7fc59042d9beeb8e053711d";
  } else {
    API_KEY = "48e078cba4a43ce1940c51b4e2d67974";
  }
}

setAPIKey();



async function fetchData(query) {
  setAPIKey(); // Update the API key before making a request
  const url = `${baseURL}search?q=${query}&lang=en&country=us&max=10&apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

fetchData("all").then((data) => renderMain(data.articles));

let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
  mobilemenu.classList.toggle("hidden");
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

      // Insert ad after every 3 news cards
      if ((i + 1) % 3 === 0) {
        mainHTML += `
          <center><script type="text/javascript">
            atOptions = {
              'key' : 'dd21beec102bcd28a391716abc1e9d2d',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
            document.write('<scr' + 'ipt type="text/javascript" src="//difficultywithhold.com/dd21beec102bcd28a391716abc1e9d2d/invoke.js"></scr' + 'ipt>');
          </script></center>
        `;
      }
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



