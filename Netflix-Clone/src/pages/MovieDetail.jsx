import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "next/image"; // ❌ Replace this (see note below)

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setMovie({
      id,
      title: "Power Rangers",
      backdrop_path: "/placeholder.jpg",
      overview:
        "A team of teenagers with attitude are recruited to save Angel Grove...",
    });
    setLoading(false);
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg max-w-2xl mb-6">{movie.overview}</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded font-bold">
            Play Trailer
          </button>
        </div>
      </div>
    </div>
  );
}
