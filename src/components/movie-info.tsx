import { API_URL } from "@/app/(home)/page";

export async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <h6>{JSON.stringify(movie)}</h6>;
}
