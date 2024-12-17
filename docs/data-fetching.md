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

## #3.2 Server Side

fetch된 api를 서버 컴포넌트가 자동으로 캐싱해준다.

**export default async 여야 하는 이유**

- next.js 가 이 컴포넌트에서 await해야하기 때문이다.
- 단점: 데이터가 도착하기 전에는 사용자가 화면을 볼 수 없음

```typescript
export const metadata = {
  title: "Home",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((res) => setTimeout(res, 5000)); //5초 로딩하는 간단한 트릭
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export default async function Home() {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
}
```

**화살표 함수**

```javascript
const ComponentName = async () => {};
```
