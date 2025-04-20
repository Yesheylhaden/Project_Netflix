import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

const opts = {
  height: "370px",
  playerVars: {
    autoplay: 1,
  },
};

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailerNotFound, setShowTrailerNotFound] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie, index) => {
    if (playingIndex === index) {
      setTrailerUrl("");
      setPlayingIndex(null);
      return;
    }

    setPlayingIndex(index);
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
        setShowTrailerNotFound(false);
      })
      .catch(() => {
        setTrailerUrl("");
        setShowTrailerNotFound(true);
        setTimeout(() => setShowTrailerNotFound(false), 800);
      });
  };

  const handleCutTrailer = () => {
    setTrailerUrl("");
    setPlayingIndex(null);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map((movie, index) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie, index)}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
            alt={movie?.name || movie?.title}
          />
        ))}
      </div>

      <div className="trailerUrl-container">
        {trailerUrl ? (
          <div key={`youtube-${trailerUrl}`}>
            <YouTube videoId={trailerUrl} opts={opts} className="youtube" />
            <button className="cutButton" onClick={handleCutTrailer}>
              Cut Trailer
            </button>
          </div>
        ) : (
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

export default Row;
