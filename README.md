## Routes 정의

#### Creating Routes

- Next.js는 폴더를 사용하여 경로를 정의하는 파일 시스템 기반 라우터를 사용한다.
- 각 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 나타낸다.
- **page.tsx 파일이 해당 경로의 페이지가 된다.** 폴더 안에 다른 파일을 만들 수 있지만 url이 되진 않는다.
- 중첩된 경로를 만들려면 폴더를 서로 중첩하면 된다.
- `ex) app/dashboard/setting/page.tsx`

#### Creating UI

- 각 경로 세그먼트에 대한 UI를 생성하는 데 특수 파일 규칙이 사용된다.
  가장 일반적인 것은 경로에 고유한 UI를 표시하는 페이지와 여러 경로에서 공유되는 UI를 표시하는 레이아웃이다.
- 예를 들어 첫 번째 페이지를 만들려면 앱 디렉터리 내에 page.js 파일을 추가하고 React 컴포넌트를 내보낸다.
- `ex) app/page.tsx`
