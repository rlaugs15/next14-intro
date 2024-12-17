## #3.0 소개

[간단한 영화 모킹 api](nomad-movies.nomadcoders.workers.dev)

- 사용예시: `https://nomad-movies.nomadcoders.workers.dev/movies`

- 사용자가 홈페이지로 가면 영화 목록을 볼 수 있게 할 것이다.
- 사용자가 영화를 클릭하면 상세정보를 볼 수 있게 할 것이다.
  - 영화의 공식 유튜브 영상도 보여줄 것이다.

## #3.1 Client Side

```typescript
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
```
