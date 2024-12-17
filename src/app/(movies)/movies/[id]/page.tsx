import MovieInfo, { getMovie } from "@/components/movie-info";
import MovieVideos from "@/components/movie-videos";
import { Suspense } from "react";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default async function MovieDetail({ params: { id } }: IParams) {
  return (
    <div>
      <Suspense
        fallback={<h1 className="font-semibold text-2xl">MovieInfo Loading</h1>}
      >
        <MovieInfo id={id} />
      </Suspense>
      <Suspense
        fallback={
          <h1 className="font-semibold text-2xl">MovieVideos Loading</h1>
        }
      >
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
