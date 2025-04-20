import React, { useEffect, useState } from 'react';
import './Banner.css'; // Imports custom styles for the banner component
import axios from '../../axios'; // Imports axios instance for making API requests
import requests from '../../request'; // Imports request parameters for API calls
import movieTrailer from 'movie-trailer'; // Imports movie trailer package for fetching trailer URLs
import YouTube from 'react-youtube'; // Imports YouTube component for embedding trailers

function Banner() {
  const [movie, setMovie] = useState(null); // State to store the movie object
  const [trailerUrl, setTrailerUrl] = useState(""); // State to store the trailer URL

  useEffect(() => {
    // useEffect hook to fetch a random movie for the banner when the component mounts
    const fetchBannerMovie = async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals); // Fetch Netflix originals from API
        const results = response.data.results; // Extract movie results from the response
        setMovie(results[Math.floor(Math.random() * results.length)]); // Pick a random movie and set it as the banner movie
      } catch (err) {
        console.error("Failed to fetch banner movie:", err); // Handle error if fetching fails
      }
    };

    fetchBannerMovie(); // Call the function to fetch the movie data
  }, []); // Empty dependency array means this effect runs once after the first render

  const handleTrailer = (movie) => {
    // Function to handle playing the trailer when the "Play" button is clicked
    if (trailerUrl) {
      setTrailerUrl(""); // If trailer URL already exists, clear it
    } else {
      // If no trailer URL exists, fetch the trailer URL
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // Extract video ID from the trailer URL
          setTrailerUrl(urlParams.get("v")); // Set the trailer video ID
        })
        .catch((err) => console.error("Trailer not found", err)); // Handle error if trailer is not found
    }
  };

  const handleMyList = () => {
    // Function to add the current movie to "My List" in localStorage
    const existingList = JSON.parse(localStorage.getItem('myList')) || []; // Get existing "My List" from localStorage
    const isAlreadyAdded = existingList.find(item => item.id === movie?.id); // Check if the movie is already in the list

    if (!isAlreadyAdded && movie) {
      localStorage.setItem('myList', JSON.stringify([...existingList, movie])); // Add the movie to the list if not already added
    }
  };

  const truncate = (str, n) => 
    str?.length > n ? str.substr(0, n - 1) + "..." : str; // Helper function to truncate long descriptions

  const opts = {
    height: '390', // Set height for YouTube player
    width: '100%', // Set width for YouTube player
    playerVars: {
      autoplay: 1, // Automatically play the trailer
    },
  };

  return (
    <div id="banner">
      <header
        className="banner"
        onClick={() => setTrailerUrl("")} // Clear the trailer URL when the banner is clicked
        style={{
          backgroundSize: "cover", // Make the background cover the entire banner
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`, // Set background image from movie data
          backgroundPosition: "center center", // Center the background image
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
            {/* Display the movie title (priority: title, name, original_name) */}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button" onClick={() => handleTrailer(movie)}>Play</button> 
            {/* "Play" button to trigger trailer */}
            <button className="banner__button" onClick={handleMyList}>My List</button>
            {/* "My List" button to add movie to localStorage */}
          </div>

          <p className="banner__description">{truncate(movie?.overview, 150)}</p>
          {/* Display truncated movie description */}
        </div>

        <div className="banner--fadeBottom" />
        {/* Fade effect at the bottom of the banner */}
      </header>

      {trailerUrl && (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <YouTube videoId={trailerUrl} opts={opts} /> 
          {/* Embed the YouTube trailer if trailerUrl exists */}
        </div>
      )}
    </div>
  );
}

export default Banner;
