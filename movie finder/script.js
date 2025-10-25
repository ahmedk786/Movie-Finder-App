const API_URL = "https://www.omdbapi.com/?apikey=18ef0328";
const movieContainer = document.getElementById("movieContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// A default stylish movie placeholder image
const DEFAULT_POSTER = "https://cdn.pixabay.com/photo/2016/08/31/11/54/movie-1636422_1280.png";

async function searchMovies(title) {
  const response = await fetch(`${API_URL}&s=${title}`);
  const data = await response.json();

  movieContainer.innerHTML = "";

  if (data.Search) {
    data.Search.forEach((movie) => {
      const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : DEFAULT_POSTER;

      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}" />
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <a href="https://www.youtube.com/results?search_query=${movie.Title}+trailer" target="_blank">▶ Watch Trailer</a>
        </div>
      `;
      movieContainer.appendChild(card);
    });
  } else {
    movieContainer.innerHTML = "<h2>No movies found 😢</h2>";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) searchMovies(searchTerm);
});

window.addEventListener("load", () => {
  searchMovies("Avengers");
  playMusic();
});

function playMusic() {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = 0.3;
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      document.body.addEventListener("click", () => {
        bgMusic.play();
      }, { once: true });
    });
  }
}
