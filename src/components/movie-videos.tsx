import { API_URL } from "@/app/(home)/page";

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
}
