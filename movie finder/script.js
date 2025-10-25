const apiKey = "18ef0328";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");
const categoryBtns = document.querySelectorAll(".category-btn");

// Preloaded movies
const preloadedMovies = ["Avengers", "Inception", "Dangal", "Frozen", "Breaking Bad"];
window.addEventListener("load", () => {
  fetchMovies(preloadedMovies.join("|"));
  playBackgroundMusic();
});

// Fetch movies by search
async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieList.innerHTML = `<p class="error">No movies found!</p>`;
    }
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

// Display movies
function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    const moviePoster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Image";

    movieCard.innerHTML = `
      <img src="${moviePoster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <a class="watch-btn" href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}" target="_blank">▶ Watch Trailer</a>
    `;
    movieList.appendChild(movieCard);
  });
}

// Search movies
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) fetchMovies(query);
  }
});

// Category buttons
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    fetchMovies(category);
  });
});

// 🎵 Auto music play
function playBackgroundMusic() {
  const audio = document.getElementById("bgMusic");
  const play = () => {
    audio.play().catch(() => {
      document.body.addEventListener("click", () => audio.play(), { once: true });
    });
  };
  play();
}
