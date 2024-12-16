# 라우팅

## #2.1 Routes 정의

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

## #2.2 Not Found Routes

**Not Found**
not-found.tsx은 일치하지 않는 전역 URL을 처리한다.  
`https://nextjs.org/docs/app/api-reference/file-conventions/not-found`

**usePathname**
usePathname은 현재 URL의 pathname을 읽을 수 있게 해주는 클라이언트 컴포넌트 훅이다.  
`https://nextjs.org/docs/app/api-reference/functions/use-pathname`

**React client hook in Server Component 오류**
서버 컴포넌트에서 React 클라이언트 훅을 사용하고 있을 때 발생하는 오류로 'use client' 를 추가해 클라이언트 컴포넌트로 바꿔줘야 함  
`https://nextjs.org/docs/messages/react-client-hook-in-server-component`

## #2.3 SSR vs CSR

**렌더링이란?**
NextJS가 리액트 컴포넌트를 브라우저가 이해할 수 있는 html로 변환하는 작업

**CSR**
모든 렌더링이 클라이언트 측에서 발생  
클라이언트는 자바스크립트를 로드하고, 자바스크립트가 UI를 빌드함

**SSR**
NextJS로 웹 사이트를 빌드할 때, **클라이언트 컴포넌트든, 서버 컴포넌트든, use client든 ${\textsf{\color{기본적으로 SSR을 사용함}Green}}$**

Nextjs에서 모든 컴포넌트(클라이언트 컴포넌트, 서버 컴포넌트, use client 등등)와 페이지들은 먼저 서버에서 렌더됨  
${\textsf{\color{('use client' 사용 여부와 상관없음)}#4174D9}}$

## #2.4 Hydration

### 하이드레이션(Hydration)이란?

**단순 HTML을 리액트 어플리케이션으로 치환하는 작업**

서버사이드 렌더링(SSR)을 통해 만들어진 인터랙티브 하지 않는 HTML을 클라이언트 측 자바스크립트를 사용하여 인터랙티브한 리액트 컴포넌트로 변환하는 과정을 말한다.  
(서버 환경에서 이미 렌더링된 HTML에 React를 붙이는 것)

> 쉽게 말하자면 Next.js는 초기 Html 파일을 먼저 전달하고 이후 HTML 요소들을 React 컴포넌트로 변환 및 이벤트리스너를 부착하여 React DOM에서 관리하게 한다. 이 과정을 Hydration(수분 보충)이라고 한다.
