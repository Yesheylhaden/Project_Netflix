import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import requests from '../../request';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (err) {
        console.error("Failed to fetch banner movie:", err);
      }
    };

    fetchBannerMovie();
  }, []);

  const handleTrailer = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.error("Trailer not found", err));
    }
  };

  const handleMyList = () => {
    const existingList = JSON.parse(localStorage.getItem('myList')) || [];
    const isAlreadyAdded = existingList.find(item => item.id === movie?.id);

    if (!isAlreadyAdded && movie) {
      localStorage.setItem('myList', JSON.stringify([...existingList, movie]));
    }
  };

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div id="banner">
      <header
        className="banner"
        onClick={() => setTrailerUrl("")}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button" onClick={() => handleTrailer(movie)}>Play</button>
            <button className="banner__button" onClick={handleMyList}>My List</button>
          </div>

          <p className="banner__description">{truncate(movie?.overview, 150)}</p>
        </div>

        <div className="banner--fadeBottom" />
      </header>

      {trailerUrl && (
        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Banner;
