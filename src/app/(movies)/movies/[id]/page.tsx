import MovieInfo from "@/components/movie-info";
import MovieVideos from "@/components/movie-videos";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
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
