# #2 라우팅

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
usePathname은 현재 URL의 pathname을 읽을 수 있게 해주는 ${\textsf{\color{#4174D9}클라이언트 컴포넌트 훅}}$이다.  
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
NextJS로 웹 사이트를 빌드할 때, \*\*클라이언트 컴포넌트든, 서버 컴포넌트든, use client든 ${\textsf{\color{green}기본적으로 SSR을 사용함}}$  
**Nextjs에서 ${\textsf{\color{green}모든 컴포넌트(클라이언트 컴포넌트, 서버 컴포넌트, use client 등등)와 페이지들은 먼저 서버에서 렌더됨}}$**
${\textsf{\color{#4174D9}'use client' 사용 여부와 상관없음}}$

## #2.4 Hydration

### 하이드레이션(Hydration)이란?

**단순 HTML을 리액트 어플리케이션으로 치환하는 작업**

서버사이드 렌더링(SSR)을 통해 만들어진 인터랙티브 하지 않는 HTML을 클라이언트 측 자바스크립트를 사용하여 인터랙티브한 리액트 컴포넌트로 변환하는 과정을 말한다.  
(서버 환경에서 이미 렌더링된 HTML에 React를 붙이는 것)

> 쉽게 말하자면 Next.js는 초기 Html 파일을 먼저 전달하고 이후 HTML 요소들을 React 컴포넌트로 변환 및 이벤트리스너를 부착하여 React DOM에서 관리하게 한다. 이 과정을 Hydration(수분 보충)이라고 한다.

## #2.5 'use client'(중요)

ssr과 달리 하이드레이션 과정은 모든 컴포넌트에 대해 발생하지 않는다.

클라이언트 컴포넌트를 사용하려면 파일 상단, import 위에 `use client` 지시어를 추가하면 된다.  
 `use client`은 서버와 클라이언트 컴포넌트 모듈 간의 경계를 선언하는 데 사용된다.  
즉, 파일에 `use client`를 정의하면 하위 컴포넌트를 포함하여 해당 파일로 가져온 다른 모든 모듈이 클라이언트 번들의 일부로 간주된다.

${\textsf{\color{#4174D9}'use client'는 오직 클라이언트에서만 렌더된다는 것을 의미하지 않는다.}}$  
${\textsf{\color{#4174D9}백엔드에서 렌더되고 프론트에서 하이드레이트됨을 의미한다.}}$  
개인적으로 `use hydrate`로 이름지었으면 더 좋았을 것이다.

'use client'를 사용하지 않은 컴포넌트는 모두 서버 컴포넌트가 될 것이다.

### 언제 사용하는지?

언제 사용하는지 걱정할 필요는 없다. app을 프로그래밍하고 컴포넌트를 만들면 에러가 뜬다.

**예를들면:**  
무언가에 `useState`를 하려 하는데 `use client`하는 것을 까먹었다. 그런 경우 프레임워크가 에러를 발생시켜준다.

> **만약 해당 컴포넌트가 클라이언트에 딱 한 번만 렌더되고 다시는 렌더될 일이 없다면 사용할 필요는 없다.  
> 사용자에 받아야 할 js 코드의 양이 줄어들어 페이지 로딩 속도가 빨라지기 때문이다.**

## #2.6 요약

- Nextjs에서는 모든 컴포넌트는 서버에서 먼저 pre render됨 (클라이언트, 서버 컴포넌트 모두 동일)
- ‘use client’ 명령어를 가진 컴포넌트는 hydrate 됨 (클라이언트에서도 렌더됨)
- hydrate란? HTML을 인터랙티브한 리액트 컴포넌트로 바꾸는 것
  - 이 방식의 장점은 사용자에 받아야 할 js 코드의 양이 줄어들어든다는 것이다.
  - 이전 버전까지의 넥스트js는 모든 컴포넌트가 hydrate 되었다.

### 의문1: 서버 컴포넌트 안에 클라이언트 컴포넌트를 가질 수 있을까?

가능하다.  
**`use client`를 사용하면 모든 children이 클라이언트 컴포넌트가 될 것이다.**  
**그 반대의 경우는 안 돤다.**

[**지원되는 패턴: 서버 컴포넌트를 클라이언트 컴포넌트에 props로 전달**](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props)  
서버 컴포넌트를 클라이언트 컴포넌트에 prop으로 전달할 수 있습니다.  
일반적인 패턴은 React children prop을 사용하여 클라이언트 컴포넌트에 "slot"을 만드는 것입니다.

[**지원되지 않는 패턴: 서버 컴포넌트를 클라이언트 컴포넌트로 가져오기** ](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#unsupported-pattern-importing-server-components-into-client-components)  
서버 컴포넌트를 클라이언트 컴포넌트로 import 할 수 없습니다.

**응용 예시:**

```javascript
import Navigation from "@/components/navigation";

export default function AboutKr() {
  //이 자리에서 api 키를 넣어서 데이터 패칭
  return (
    <div className="">
      <Navigation />
      <span>AboutKr</span>
    </div>
  );
}
```

jsx 코드들은 서버에서만 실행돼서 여기서 api 키를 사용해 api 패칭을 해도 클라이언트로 절대 가지 않기 때문에 보안을 신경쓰지 않아도 된다.

## #2.7 Layouts

어플리케이션을 빌드할 때 재사용하는 요소(element)들이 있기 때문이다.  
예를 들면 모든 페이지에 동일한 네비게이션 바를 적용하고 싶은 경우가 있겠다.

### 어떻게 작동하나?

**예시: about-kr 페이지로 이동**  
넥스트js는 바로 AboutKr 컴포넌트로 가서 구성요소를 렌더링하지 않는다.

1. 레이아웃 컴포넌트(파일)로 이동해서 export default된 컴포넌트(이름 무관)를 렌더링

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

2. 다음과 같이 렌더링한다.

```javascript
<Layout>
  <AboutKr />
</Layout>
```

### 다른 페이지에 추가로 레이아웃을 적용하고 싶을 때

원하는 페이지 폴더 안에 layout.jsx 만들면 된다.  
단, html,body태그는 루트 레이아웃 파일에만 있어야하고 파일 명은 layout이여야 한다.

**예시: about-kr 페이지에 추가로 레이아웃을 적용하고 싶을 때**

```
app/
│
├── about-kr/
│ └── layout.tsx //이렇게 적용하면 된다.
│ └── page.tsx
├── layout.tsx
├── not-found.tsx
└── page.tsx
```

${\textsf{\color{green}참고로 'about-kr/'의 레이아웃은 'about-kr/'의 하위 폴더(url)에도 전부 적용된다.}}$  
${\textsf{\color{green}넥스트js는 url을 통해 폴더에 들어가서 레이아웃의 유무를 확인하고, 해당 폴더에 레이아웃이 없다면 상위 폴더로 거슬러 올라가 찾기 때문이다.}}$  
`/about-kr/company/jobs/sales`

**넥스트js는 다음과 같이 레이아웃을 적용한다.**

```javascript
<Layout>
  <AboutUsLayout>
    <SalesLayout>
      <Sales />
    </SalesLayout>
  </AboutUsLayout>
</Layout>
```

레이아웃은 서로 상쇄되지 않고 중첩된다.

## #2.8 라우트 그룹과 메타데이터

### 라우트 그룹

[참고 하면 좋은 블로그](https://velog.io/@c_h_hyuk/Next.js-14-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-7-Route-Groups)

- /login, /logout 등의 페이지들을 (auth)로 묶는 등 유용하다.

폴더이름을 괄호로 만들어 URL 경로에 포함되지 않도록 하는 것  
[Next.js 공식문서(한글판)](https://nextjs-ko.org/docs/app/building-your-application/routing/route-groups)

**라우트 그룹 적용 전**

```
app/
│
├── about-kr/
│ └── layout.tsx
│ └── page.tsx
├── layout.tsx
├── not-found.tsx
└── page.tsx
```

**라우트 그룹 적용 후**

```
app/
│
├── (home) // 라우트 그룹 적용
│ └── page.tsx // /app/page.tsx에서 이동
├── about-kr/
│ └── layout.tsx
│ └── page.tsx
├── layout.tsx
├── not-found.tsx
```

- ${\textsf{\color{green}루트파일 중 모든 페이지에 영향을 주는 layout , not-found 파일은 밖에 있어야 한다.}}$
- ( ) 로 명명된 폴더는 ${\textsf{\color{#4174D9}url에 영향을 주지 않는다}}$
- route groups은 폴더 이름을 괄호로 묶으면 되고, 괄호 안의 이름은 마음대로 지정할 수 있다.
- 라우트 그룹 내부의 레이아웃은 해당 그룹내의 페이지에만 적용된다.

- **예시: (moves)**
  해당 그룹 안에 영화 세부페이지나 영화, 배우 검색 등을 넣으면 더 깔끔해진다.

### 메타데이터

페이지의 head 부분 설정하며 메타더이터는 병합된다.
[메타데이터 공식문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata)

```typescript
//layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  //나머지 코드
```

- 꼭 내보내야 하는 객체이고, 객체 안에 뭐가 있던지 페이지의 헤드(브라우저 탭) 부분에 표시된다.
- **${\textsf{\color{green}메타데이터는 서버 컴포넌트에서만 있을 수 있다.}}$**
- **${\textsf{\color{green}`page.tsx`나 `layout.tsx`만 메타데이터를 내보낼 수 있다.}}$**
- 레이아웃이 중첩되는 방식과 마찬가지로 ${\textsf{\color{#4174D9}$메타데이터도 중첩 가능하지만 실제로는 **병합**이 된다.}}
  - `/`에 있으면 해당 메타데이터가, `/about-kr`에 있으면 해당 메타데이터가 적용된다.

#### 메타데이터 템플릿

다음과 같이 각각의 페이지나 레이아웃에 반복되는 메타데이터들이 있다고 해보자.

```javascript
title: 'Home | Movies', title: 'AboutKr | Movies', title: 'Sales | Movies'
```

이것들의 템플릿은 다음과 같이 만들 수 있다.
**메타데이터 템플릿 예시**

```typescript
// /app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | Movies",
    default: "Next Movie", //template의 %s에 들어갈 기본값
  },
  description: "The best movies on the best framework",
};

// /app/about-kr/layout.tsx
export const metadata: Metadata = {
  title: "AboutKr",
};

// /app/about-kr/sales/layout.tsx
export const metadata: Metadata = {
  title: "Sales",
};
```

이렇게 하면 `/app/layout.tsx`의 `%s` 부분에 `AboutKr`이나 `Sales`이 들어가게 된다.

#### [동적 메타데이터](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata)

generateMetadata 함수를 사용하여 동적 값이 필요한 메타데이터를 가져올 수 있다.

- **예시:** 페이지의 이름이 api에서 오는 등

## #2.9 동적 라우터(Dynamic Routes)

[ ] 안에 명을 넣으면 됨

**예시:**

```
app/
│
├── (movies)
│ └── movies
│   └── [id]
│     └── page.tsx
```

```typescript

```

**params 조회:**

```typescript
export default function MovieDetail({ params }: { params: { id: number } }) {
  console.log(params.id);

  return <div>MovieDetail</div>;
}
```

쿼리스트링은 searchParams로 조회하면 된다.
