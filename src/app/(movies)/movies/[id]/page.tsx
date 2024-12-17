import { API_URL } from "@/app/(home)/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}
async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const [movie, videos] = await Promise.all([
    getMovie(String(id)),
    getVideos(String(id)),
  ]);
  console.log("movie", movie);
  console.log("videos", videos);

  return <div>Movie {}</div>;
}
