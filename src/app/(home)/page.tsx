const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((res) => setTimeout(res, 5000)); //5초 로딩하는 간단한 트릭
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export default async function Home() {
  const movies = await getMovies();
  return (
    <>
      <div>{JSON.stringify(movies)}</div>
    </>
  );
}
