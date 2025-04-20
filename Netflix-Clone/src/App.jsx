import React from 'react'; // Importing React library
import './App.css'; // Importing the CSS file for styling
import Row from './Components/Row/Row'; // Importing the Row component
import Banner from './Components/Banner/Banner'; // Importing the Banner component
import Navbar from './Components/Navbar/Navbar'; // Importing the Navbar component
import requests from './request'; // Importing API endpoints for fetching movie data

function App() {
  return (
    <div className="app"> {/* Root div for the app */}
      <Navbar /> {/* Displaying the navigation bar */}
      <Banner /> {/* Displaying the banner section */}

      {/* Rendering multiple Row components with different titles and API fetch URLs */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow // This row uses larger poster images
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App; // Exporting the App component for rendering
