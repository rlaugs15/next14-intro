"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, steMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://nomad-movies.nomadcoders.workers.dev/movies"
    );
    const json = await response.json();
    steMovies(json);
    setIsLoading(false);
  };

  console.log(movies);

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <div>{isLoading ? "loading..." : JSON.stringify(movies)}</div>
    </>
  );
}
