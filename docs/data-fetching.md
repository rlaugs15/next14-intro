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
