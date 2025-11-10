# ETECH ITSM Portal - React Frontend

GS Retail ITSM Portal의 React + TypeScript 기반 프론트엔드 애플리케이션입니다.

## 목차

- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [폴더 구조](#폴더-구조)
- [주요 기능](#주요-기능)
- [개발 가이드](#개발-가이드)
- [빌드 및 배포](#빌드-및-배포)
- [테스트 계정](#테스트-계정)

## 기술 스택

### Core
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구

### 상태 관리
- **Zustand** - 경량 상태 관리
- **React Router v6** - 라우팅

### 스타일링
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React** - 아이콘

### API & 모킹
- **Axios** - HTTP 클라이언트
- **MSW (Mock Service Worker)** - API 모킹

### 개발 도구
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포매팅
- **Husky** - Git Hooks
- **Lint-Staged** - Staged 파일 린팅
- **Commitlint** - 커밋 메시지 검증

## 시작하기

### 필수 요구사항

- Node.js >= 20.10.0
- npm >= 10.2.3

### 설치

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속
\`\`\`

### 사용 가능한 스크립트

\`\`\`bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린팅
npm run lint
npm run lint:fix

# 포매팅
npm run format
npm run format:check

# 타입 체크
npm run type-check
\`\`\`

## 폴더 구조

\`\`\`
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # Button, Input 등 공통 컴포넌트
│   ├── layout/         # Header, MainLayout
│   └── domain/         # 도메인별 컴포넌트 (ServiceCard 등)
│
├── pages/              # 페이지 컴포넌트
│   ├── Login/         # 로그인 페이지
│   └── Dashboard/     # 대시보드 페이지
│
├── hooks/              # Custom hooks
│
├── services/           # API 서비스
│   ├── api.ts         # Axios 인스턴스 및 인터셉터
│   ├── authService.ts # 인증 API
│   └── serviceService.ts # 서비스 API
│
├── stores/             # Zustand 스토어
│   └── authStore.ts   # 인증 상태 관리
│
├── types/              # TypeScript 타입 정의
│   ├── common.types.ts    # 공통 타입
│   ├── auth.types.ts      # 인증 관련 타입
│   └── service.types.ts   # 서비스 관련 타입
│
├── utils/              # 유틸리티 함수
│   ├── storage.utils.ts      # 로컬/세션 스토리지 헬퍼
│   └── validation.utils.ts   # 폼 검증 함수
│
├── constants/          # 상수 정의
│   ├── api.constants.ts     # API 엔드포인트
│   ├── routes.constants.ts  # 라우트 경로
│   └── app.constants.ts     # 앱 설정
│
├── routes/             # 라우트 설정
│   ├── index.tsx           # 라우터 설정
│   └── ProtectedRoute.tsx  # 인증 가드
│
├── mocks/              # MSW Mock 데이터
│   ├── handlers/      # API 핸들러
│   ├── data/          # Mock 데이터
│   └── browser.ts     # MSW 워커 설정
│
├── styles/             # 글로벌 스타일
│   └── index.css      # Tailwind CSS import
│
├── App.tsx             # 루트 컴포넌트
└── main.tsx            # 애플리케이션 진입점
\`\`\`

## 주요 기능

### 1. 인증 시스템
- 로그인/로그아웃
- JWT 토큰 기반 인증
- 자동 토큰 갱신
- 인증 라우트 가드

### 2. 대시보드
- 7개 서비스 카드 그리드
- 서비스 상태 표시
- 서비스별 라우팅

### 3. Mock API (MSW)
- 개발 환경에서 실제 백엔드 없이 작업 가능
- 로그인 API 모킹
- 서비스 목록 API 모킹

### 4. 상태 관리
- Zustand를 활용한 전역 상태 관리
- localStorage 영속성
- 타입 안전성 보장

### 5. 라우팅
- React Router v6
- Protected Routes (인증 가드)
- Lazy Loading (코드 스플리팅)
- 404 페이지

## 개발 가이드

### 컴포넌트 작성 규칙

1. **함수형 컴포넌트 사용**
\`\`\`typescript
export const MyComponent = () => {
  return <div>...</div>
}
\`\`\`

2. **Props 타입 정의**
\`\`\`typescript
interface MyComponentProps {
  title: string
  onSubmit: () => void
}

export const MyComponent = ({ title, onSubmit }: MyComponentProps) => {
  return <div>...</div>
}
\`\`\`

3. **파일명 규칙**
- 컴포넌트: PascalCase (예: \`Button.tsx\`)
- 유틸리티: camelCase (예: \`validation.utils.ts\`)
- 타입: camelCase (예: \`auth.types.ts\`)

### API 서비스 추가

\`\`\`typescript
// src/services/myService.ts
import { api } from './api'

export const myService = {
  getData: async () => {
    return api.get('/data')
  },

  postData: async (data: MyData) => {
    return api.post('/data', data)
  },
}
\`\`\`

### Zustand 스토어 추가

\`\`\`typescript
// src/stores/myStore.ts
import { create } from 'zustand'

interface MyState {
  count: number
  increment: () => void
}

export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
\`\`\`

### 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

\`\`\`
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
perf: 성능 개선
test: 테스트 추가
chore: 빌드 업무 수정
\`\`\`

예시:
\`\`\`
feat: Add user profile page
fix: Resolve login redirect issue
docs: Update README with API documentation
\`\`\`

## 빌드 및 배포

### 프로덕션 빌드

\`\`\`bash
# 빌드
npm run build

# 빌드 결과물은 dist/ 폴더에 생성됩니다.
\`\`\`

### 환경 변수

프로덕션 환경의 경우 \`.env.production\` 파일을 생성하세요.

\`\`\`env
VITE_API_BASE_URL=https://api.yourserver.com
VITE_APP_ENV=production
\`\`\`

## 테스트 계정

개발 환경에서 사용 가능한 테스트 계정:

| 사용자 ID | 비밀번호 | 역할 |
|----------|---------|------|
| admin    | admin   | 관리자 |
| user     | user    | 일반 사용자 |

## 라이선스

© 2024 GS Retail. All rights reserved.

---

## 문제 해결

### MSW가 작동하지 않는 경우

1. \`public/mockServiceWorker.js\` 파일이 있는지 확인
2. 브라우저 콘솔에서 MSW 로그 확인
3. 필요시 MSW 재초기화:
\`\`\`bash
npx msw init public/ --save
\`\`\`

### ESLint 에러가 발생하는 경우

\`\`\`bash
# ESLint 캐시 삭제
rm -rf .eslintcache

# 자동 수정 시도
npm run lint:fix
\`\`\`

### TypeScript 에러가 발생하는 경우

\`\`\`bash
# 타입 체크
npm run type-check

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 추가 리소스

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MSW Documentation](https://mswjs.io/docs/)
