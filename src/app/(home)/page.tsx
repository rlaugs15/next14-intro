import Link from "next/link";

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  //await new Promise((res) => setTimeout(res, 1000)); //1초 로딩하는 간단한 트릭
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <ul className="flex flex-col">
      {movies.map((movie: any) => (
        <Link href={`movies/${movie.id}`} className="font-semibold">
          {movie.title}
        </Link>
      ))}
    </ul>
  );
}
