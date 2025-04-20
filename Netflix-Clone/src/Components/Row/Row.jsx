import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import './Row.css'; // Importing CSS styles for the component
import axios from '../../axios'; // Importing custom axios instance for API requests
import YouTube from 'react-youtube'; // Importing YouTube component to embed videos
import movieTrailer from 'movie-trailer'; // Library to search for movie trailers on YouTube

const baseUrl = "https://image.tmdb.org/t/p/original/"; // Base URL to fetch images from TMDB

// Options for YouTube player
const opts = {
  height: "370px",
  playerVars: {
    autoplay: 1, // Autoplay video when loaded
  },
};

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); // State to store movies fetched from API
  const [trailerUrl, setTrailerUrl] = useState(""); // State to store YouTube trailer video ID
  const [showTrailerNotFound, setShowTrailerNotFound] = useState(false); // State to show 'trailer not found' message
  const [playingIndex, setPlayingIndex] = useState(null); // State to keep track of which trailer is playing

  // useEffect runs when component mounts or fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl); // Fetch data from given API URL
        setMovies(request.data.results); // Store fetched movies in state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any error
      }
    }
    fetchData(); // Call fetch function
  }, [fetchUrl]); // Dependency array to trigger effect on fetchUrl change

  // Handle click on a movie poster
  const handleClick = (movie, index) => {
    // If the clicked movie is already playing, stop it
    if (playingIndex === index) {
      setTrailerUrl("");
      setPlayingIndex(null);
      return;
    }

    // Set the index of the currently playing movie
    setPlayingIndex(index);

    // Try to find the trailer URL using movieTrailer
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search); // Parse YouTube URL
        setTrailerUrl(urlParams.get('v')); // Extract and set the YouTube video ID
        setShowTrailerNotFound(false); // Hide 'trailer not found' if previously shown
      })
      .catch(() => {
        setTrailerUrl(""); // Clear trailer URL if not found
        setShowTrailerNotFound(true); // Show 'trailer not found' message
        // Automatically hide message after 800ms
        setTimeout(() => setShowTrailerNotFound(false), 800);
      });
  };

  // Handle clicking the "Cut Trailer" button
  const handleCutTrailer = () => {
    setTrailerUrl(""); // Stop trailer
    setPlayingIndex(null); // Reset playing index
  };

  return (
    <div className="row">
      <h2>{title}</h2> {/* Display the row title */}

      <div className="row__posters">
        {/* Render movie posters */}
        {movies?.map((movie, index) => (
          <img
            key={movie.id} // Unique key for each image
            onClick={() => handleClick(movie, index)} // Handle click on poster
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`} // Conditional class for large posters
            src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`} // Poster image URL
            alt={movie?.name || movie?.title} // Alternative text
          />
        ))}
      </div>

      <div className="trailerUrl-container">
        {/* If trailer is available, show YouTube player */}
        {trailerUrl ? (
          <div key={`youtube-${trailerUrl}`}>
            <YouTube videoId={trailerUrl} opts={opts} className="youtube" />
            <button className="cutButton" onClick={handleCutTrailer}>
              Cut Trailer
            </button>
          </div>
        ) : (
          // If trailer not found, show message
          showTrailerNotFound && (
            <div id="not-found">
              <h3>Trailer not found</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Row; // Export the component for use in other parts of the app
