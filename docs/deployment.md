## #4.0 소개

- 페이지를 이쁘게 꾸미기
- vercel에 배포하기

## #4.4 Dynamic Metadata

#### [generateMetadata 함수 공식문서](https://nextjs-ko.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-%ED%95%A8%EC%88%98)

- 메타데이터 객체(metadata) 및 generateMetadata 함수는 서버 컴포넌트에서만 지원된다.
- 동일한 경로에서 메타데이터 객체와 generateMetadata 함수를 모두 export 할 수는 없다. (둘 중 하나만 사용 가능)

async function 처럼 generateMetadata에 params를 받아 올 수 있어 동적 메타데이터를 적용 할 수 있다.  
getMovie 함수를 2번 호출하고 있지만 이번 버전 부터는 캐싱이 되어 상관없다.

```typescript
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
```
