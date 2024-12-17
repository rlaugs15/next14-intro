## #3.0 소개

[간단한 영화 모킹 api](https://nomad-movies.nomadcoders.workers.dev/)

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

- next.js 가 이 컴포넌트에서 await해야하기 때문이다.(Suspense 등)
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

## #3.3 Loading Components

로딩화면을 보기 위해 10초 뒤에 데이터가 불러오도록 함  
넥스트js는 중첩 경로에서 특정 동작을 가진 UI를 생성하기 위해 일련의 특수 파일을 제공하는데 loading도 그 중 하나이다.  
[공식문서 참고](https://nextjs-ko.org/docs/app/building-your-application/routing#%ED%8C%8C%EC%9D%BC-%EA%B7%9C%EC%B9%99)

```typescript
export const metadata = {
  title: "Home",
};

const URL = "https://.../movies";

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export default async function Home() {
  const movies = await getMovies();
  return <div>{JSON.stringify(movies)}</div>;
}
```

#### 로딩 컴포넌트

```typescript
export default function Loading() {
  return <h2>Loading...</h2>;
}
```

데이터를 불러오는 10초 동안 로딩 컴포넌트가 보여진다.

## #3.4 병렬 리퀘스트(Parallel Requests)

홈 화면에서 id를 movies/[id]에 보내주고, id를 이용해 2개의 api 응답을 동시에 받을 것이다.

```typescript
import { Link } from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://.../movies";

async function getMovies() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <a href={`movies/${movie.id}`}>{movie.title}</a>
        </li>
      ))}
    </div>
  );
}
```

#### movies/[id] 페이지

여러 api 불러올 때 병렬 처리 Promise.all 함수로 불러올 수 있다.  
단점 : 모든 api가 불러와져야 화면을 보여준다.

```typescript
import { API_URL } from "../../../(home)/page";

async function getMovie(id) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); //패칭시간 테스트용
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

async function getVideos(id) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`${API_URL}/${id}/videos`);
  return res.json();
}

export default async function Movie({ params: { id } }) {
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
}
```

## #3.5 Suspense

하나의 컴포넌트에 두 api를 동시에 불러올 때 준비가 먼저 끝난 거는 먼저 보여준다.

- 병렬적으로 2가지(혹은 그 이상)를 동시에 fetch할 수 있고 먼저 완료되는 순서로 render된다.
- 각각 api를 불러오는 컴포넌트로 만들어 개별적으로 기다리게 한다.

Suspense 가 데이터를 fetch 하기 위해 안의 컴포넌트를 await한다.  
Suspense 의 fallback 컴포넌트가 await 되는 동안 (fetch 중에)표시할 메세지를 render할 수 있게 해준다.  
${\textsf{\color{green}Movie 컴포넌트에서 이제 직접 데이터 패치를 하지 않기 때문에 형제 페이지인 loading.tsx는 활동하지 않음}}$

- Page 단위 로딩 => loading.tsx
- 서버 컴포넌트 단위 로딩 => Suspense

```typescript
//movies/[id]
import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideo from "../../../../components/movie-videos";

export default async function Movie({ params: { id } : {
  params: { id: number };
} }) {
  return (
    <div>
      <Suspense fallback={<h1>Loading Info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading video</h1>}>
        <MovieVideo id={id} />
      </Suspense>
    </div>
  );
}
```

#### components/movie-info.tsx

```typescript
import { API_URL } from "../app/(home)/page";

async function getMovie(id) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <div>
      <h6>{JSON.stringify(movie)}</h6>
    </div>
  );
}
```

#### components/movie-videos.tsx

```typescript
import { API_URL } from "../app/(home)/page";

async function getVideos(id) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${API_URL}/${id}/videos`);
  return res.json();
}

export default async function MovieVideo({ id }: { id: string }) {
  const videos = await getVideos(id);

  return (
    <div>
      <h6>{JSON.stringify(videos)}</h6>
    </div>
  );
}
```

## #3.6 요약

- **데이터 패칭:** 클라이언트 / 서버에서 모두 가능.
- **로딩 UI:** loading.tsx(전체), Suspense(부분).
- **병렬 처리:** Promise.all로 동시 호출.
- **독립적 데이터 렌더링:** Suspense를 통해 유연하게 처리.
